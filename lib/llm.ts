import { Recipe } from './types';

export type RewriteResponse = {
  rewrittenSteps: string[];
  tips?: string;
};

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
