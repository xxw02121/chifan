export type Ingredient = {
  item: string;
  amount: number;
  unit: string;
};

export type Recipe = {
  id: string;
  name: string;
  type: 'protein' | 'veg';
  oil_tsp: number;
  time_min: number;
  ingredients: Ingredient[];
  steps: string[];
  tags: string[];
};

export type DailyPlan = {
  protein: Recipe;
  veg: Recipe;
};

export type WeeklyDay = {
  day: string;
  protein: Recipe;
  veg: Recipe;
};

export type WeeklyPlan = {
  days: WeeklyDay[];
  shoppingList: ShoppingGroup[];
};

export type ShoppingItem = {
  item: string;
  amount: number;
  unit: string;
  category: string;
};

export type ShoppingGroup = {
  category: string;
  items: ShoppingItem[];
};

export type Preferences = {
  noSpicy: boolean;
  noBeef: boolean;
  noFish: boolean;
  moreBudget: boolean;
};
