import { DailyPlan, Preferences, Recipe, ShoppingGroup, ShoppingItem, WeeklyPlan } from './types';
import { proteinRecipes, vegRecipes } from './recipes';

type PlannerOptions = {
  recentIds?: string[];
  dislikedIds?: string[];
  preferences?: Preferences;
  customProtein?: Recipe[];
  customVeg?: Recipe[];
};

const defaultPrefs: Preferences = {
  noSpicy: false,
  noBeef: false,
  noFish: false,
  moreBudget: false
};

function weightRecipe(recipe: Recipe, opts: PlannerOptions, usedItems: Set<string>): number {
  const prefs = { ...defaultPrefs, ...opts.preferences };
  let weight = 1;

  if (opts.recentIds?.includes(recipe.id)) weight *= 0.1;
  if (opts.dislikedIds?.includes(recipe.id)) weight *= 0.2;
  if (prefs.noSpicy && recipe.tags.some(t => t.includes('辣'))) weight *= 0.2;
  if (prefs.noBeef && (recipe.name.includes('牛') || recipe.tags.includes('牛肉'))) weight *= 0.25;
  if (prefs.noFish && (recipe.tags.includes('鱼') || recipe.name.includes('鱼'))) weight *= 0.2;
  if (prefs.moreBudget && (recipe.name.includes('牛') || recipe.name.includes('虾') || recipe.name.includes('三文鱼'))) weight *= 0.3;

  const overlap = recipe.ingredients.some(i => usedItems.has(i.item));
  if (overlap) weight *= 1.25;

  return weight;
}

function weightedPick(list: Recipe[], weights: number[]): Recipe | undefined {
  const total = weights.reduce((a, b) => a + b, 0);
  if (total <= 0) return undefined;
  let rnd = Math.random() * total;
  for (let i = 0; i < list.length; i++) {
    rnd -= weights[i];
    if (rnd <= 0) return list[i];
  }
  return list[list.length - 1];
}

export function daily(opts: PlannerOptions = {}): DailyPlan {
  const proteins = [...proteinRecipes, ...(opts.customProtein || [])];
  const vegs = [...vegRecipes, ...(opts.customVeg || [])];

  const used = new Set<string>();
  const proteinWeights = proteins.map(r => weightRecipe(r, opts, used));
  const protein = weightedPick(proteins, proteinWeights) || proteins[0];

  const vegCandidates = vegs.filter(v => {
    const totalTime = v.time_min + protein.time_min;
    const totalOil = v.oil_tsp + protein.oil_tsp;
    const avoidRecent = opts.recentIds?.includes(v.id);
    return totalTime <= 25 && totalOil <= 2.5 && !avoidRecent;
  });
  const vegWeights = vegCandidates.map(r => {
    const baseWeight = weightRecipe(r, opts, used);
    const light = r.tags.some(t => ['清爽', '低油', '凉拌'].some(k => t.includes(k)));
    return baseWeight * (light ? 1.1 : 1);
  });
  const fallbackVeg = vegCandidates.find(v => v.time_min + protein.time_min <= 25 && v.oil_tsp + protein.oil_tsp <= 2.5) || vegs[0];
  const veg = weightedPick(vegCandidates, vegWeights) || fallbackVeg;

  return { protein, veg };
}

export function weekly(opts: PlannerOptions = {}): WeeklyPlan {
  const days: WeeklyPlan['days'] = [];
  const usedItems = new Set<string>();
  const dayNames = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  const history: string[] = opts.recentIds ? [...opts.recentIds] : [];
  const proteins = [...proteinRecipes, ...(opts.customProtein || [])];
  const vegs = [...vegRecipes, ...(opts.customVeg || [])];

  for (let i = 0; i < 7; i++) {
    const prefs = { ...opts, preferences: opts.preferences };
    const proteinWeights = proteins.map(r => weightRecipe(r, prefs, usedItems));
    let protein = weightedPick(proteins, proteinWeights) || proteins[i % proteins.length];

    const vegCandidates = vegs.filter(v => {
      const totalTime = v.time_min + protein.time_min;
      const totalOil = v.oil_tsp + protein.oil_tsp;
      const recent = history.slice(-3).includes(v.id) || history.slice(-3).includes(protein.id);
      return totalTime <= 25 && totalOil <= 2.5 && !recent;
    });
    const vegWeights = vegCandidates.map(v => weightRecipe(v, prefs, usedItems));
    const fallbackVeg = vegCandidates.find(v => v.time_min + protein.time_min <= 25 && v.oil_tsp + protein.oil_tsp <= 2.5) || vegs[i % vegs.length];
    const veg = weightedPick(vegCandidates, vegWeights) || fallbackVeg;

    days.push({ day: dayNames[i], protein, veg });
    history.push(protein.id, veg.id);
    protein.ingredients.forEach(i => usedItems.add(i.item));
    veg.ingredients.forEach(i => usedItems.add(i.item));
  }

  return { days, shoppingList: buildShopping(days) };
}

function normalizeKey(item: string, unit: string) {
  return `${item}__${unit}`;
}

function categorize(item: string): string {
  const meatKeys = ['鸡', '肉', '牛', '鱼', '虾', '腊肠', '羊'];
  const vegKeys = ['菜', '瓜', '椒', '番茄', '茄', '豆', '花', '菌', '蒜', '葱', '姜', '萝卜', '土豆', '白菜', '生菜', '玉米', '海带'];
  if (meatKeys.some(k => item.includes(k))) return '肉蛋类';
  if (vegKeys.some(k => item.includes(k))) return '蔬菜类';
  return '调味基础类';
}

export function buildShopping(days: WeeklyPlan['days']): ShoppingGroup[] {
  const map = new Map<string, ShoppingItem>();

  days.forEach(d => {
    [d.protein, d.veg].forEach(r => {
      r.ingredients.forEach(ing => {
        const key = normalizeKey(ing.item, ing.unit);
        const category = categorize(ing.item);
        const existing = map.get(key);
        if (existing) {
          existing.amount += ing.amount;
        } else {
          map.set(key, { item: ing.item, amount: ing.amount, unit: ing.unit, category });
        }
      });
    });
  });

  const categories = ['肉蛋类', '蔬菜类', '调味基础类'];
  return categories
    .map(cat => ({
      category: cat,
      items: Array.from(map.values()).filter(i => i.category === cat)
    }))
    .filter(g => g.items.length > 0);
}
