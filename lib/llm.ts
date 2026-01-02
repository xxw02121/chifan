import { Recipe } from './types';

export type RewriteResponse = {
  rewrittenSteps: string[];
  tips?: string;
};

export type GeneratedRecipe = Recipe;

export async function rewriteRecipe(recipe: Recipe, userPreference?: string): Promise<RewriteResponse | null> {
  try {
    const res = await fetch('/api/llm/rewrite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        dishName: recipe.name,
        oil_tsp: recipe.oil_tsp,
        time_min: recipe.time_min,
        ingredients: recipe.ingredients,
        steps: recipe.steps,
        userPreference
      })
    });
    if (!res.ok) return null;
    return (await res.json()) as RewriteResponse;
  } catch (e) {
    console.error('rewrite fail', e);
    return null;
  }
}

export async function generateRecipe(idea: string, type: 'protein' | 'veg'): Promise<GeneratedRecipe | null> {
  try {
    const res = await fetch('/api/llm/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idea, type })
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json as GeneratedRecipe;
  } catch (e) {
    console.error('generate fail', e);
    return null;
  }
}
