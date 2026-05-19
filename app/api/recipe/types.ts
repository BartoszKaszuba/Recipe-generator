export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface RecipeRequest {
  ingredients?: string;
  diet?: string;
  cuisine?: string;
  mealType?: string;
  messages?: Message[];
}

export interface Recipe {
  recipeName?: string;
  summary?: string;
  ingredients?: string[];
  instructions?: string[];
  tips?: string;
  followUp?: string;
  thanks?: string;
}

export interface ApiError {
  error: string;
  status: number;
}
