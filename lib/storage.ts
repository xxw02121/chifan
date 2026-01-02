import { DailyPlan, Preferences, WeeklyPlan } from './types';

const FAVORITES_KEY = 'tm-favorites';
const DISLIKE_KEY = 'tm-dislikes';
const HISTORY_KEY = 'tm-history';
const WEEKLY_KEY = 'tm-weekly';
const PREF_KEY = 'tm-pref';
const CUSTOM_KEY = 'tm-custom-recipes';

export function readLocal<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeLocal<T>(key: string, value: T) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function getFavorites(): string[] {
  return readLocal<string[]>(FAVORITES_KEY, []);
}

export function toggleFavorite(id: string) {
  const list = getFavorites();
  const next = list.includes(id) ? list.filter(x => x !== id) : [...list, id];
  writeLocal(FAVORITES_KEY, next);
  return next;
}

type DislikeRecord = { id: string; ts: number };

export function addDislike(id: string) {
  const list = readLocal<DislikeRecord[]>(DISLIKE_KEY, []);
  const now = Date.now();
  const filtered = list.filter(x => now - x.ts < 7 * 24 * 3600 * 1000 && x.id !== id);
  filtered.push({ id, ts: now });
  writeLocal(DISLIKE_KEY, filtered);
  return filtered;
}

export function getActiveDislikes(): string[] {
  const list = readLocal<DislikeRecord[]>(DISLIKE_KEY, []);
  const now = Date.now();
  const active = list.filter(x => now - x.ts < 7 * 24 * 3600 * 1000).map(x => x.id);
  return active;
}

export function addHistory(plan: DailyPlan) {
  const history = readLocal<string[]>(HISTORY_KEY, []);
  const next = [...history, plan.protein.id, plan.veg.id].slice(-12);
  writeLocal(HISTORY_KEY, next);
  return next;
}

export function getHistory(): string[] {
  return readLocal<string[]>(HISTORY_KEY, []);
}

export function saveWeekly(plan: WeeklyPlan) {
  writeLocal(WEEKLY_KEY, plan);
}

export function loadWeekly(): WeeklyPlan | null {
  return readLocal<WeeklyPlan | null>(WEEKLY_KEY, null);
}

export function savePreferences(pref: Preferences) {
  writeLocal(PREF_KEY, pref);
}

export function loadPreferences(): Preferences {
  return readLocal<Preferences>(PREF_KEY, {
    noSpicy: false,
    noBeef: false,
    noFish: false,
    moreBudget: false
  });
}

export function loadCustomRecipes(): import('./types').Recipe[] {
  return readLocal<import('./types').Recipe[]>(CUSTOM_KEY, []);
}

export function addCustomRecipe(recipe: import('./types').Recipe) {
  const list = loadCustomRecipes();
  const exists = list.find(r => r.id === recipe.id);
  const next = exists ? list.map(r => (r.id === recipe.id ? recipe : r)) : [...list, recipe];
  writeLocal(CUSTOM_KEY, next);
  return next;
}
