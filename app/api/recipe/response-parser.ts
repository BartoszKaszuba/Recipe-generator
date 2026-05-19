import { Recipe, ApiError } from './types';

export function parseRecipeResponse(responseText: string): Recipe | ApiError {
  // Clean up markdown code blocks if present
  const cleanedText = responseText
    .replace(/^```json\n?/, '')
    .replace(/\n?```$/, '')
    .trim();

  // Parse JSON
  let recipe: Recipe;
  try {
    recipe = JSON.parse(cleanedText);
  } catch (error) {
    console.error('Failed to parse OpenAI response:', responseText);
    return {
      error: 'Failed to parse recipe response',
      status: 500,
    };
  }

  // If it's a follow-up question or thanks-only response, return as-is
  if (recipe.followUp || (!recipe.recipeName && recipe.thanks)) {
    return recipe;
  }

  // For full recipe responses, validate required fields
  const validationError = validateRecipeFields(recipe);
  if (validationError) {
    return validationError;
  }

  return recipe;
}

function validateRecipeFields(recipe: Recipe): ApiError | null {
  const requiredFields = [
    'recipeName',
    'summary',
    'ingredients',
    'instructions',
  ];

  for (const field of requiredFields) {
    if (!recipe[field as keyof Recipe]) {
      return {
        error: 'Incomplete recipe data received',
        status: 500,
      };
    }
  }

  return null;
}
