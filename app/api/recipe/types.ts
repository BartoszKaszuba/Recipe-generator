export interface RecipeRequest {
  ingredients: string;
  diet?: string;
  cuisine?: string;
  mealType?: string;
}

export interface Recipe {
  recipeName: string;
  summary: string;
  ingredients: string[];
  instructions: string[];
  tips: string;
}

export interface ApiError {
  error: string;
  status: number;
}
