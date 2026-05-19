import { RecipeRequest, ApiError } from './types';

export function validateRecipeRequest(body: RecipeRequest): ApiError | null {
  // Check if ingredients field exists and is not empty
  if (!body.ingredients || body.ingredients.trim() === '') {
    return {
      error: 'Ingredients field is required and cannot be empty',
      status: 400,
    };
  }

  return null;
}
