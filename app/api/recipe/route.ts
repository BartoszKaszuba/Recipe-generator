import { NextRequest, NextResponse } from 'next/server';
import { RecipeRequest, ApiError, Recipe } from './types';
import { validateRecipeRequest } from './validators';
import { callOpenAIForRecipe } from './openai-service';
import { parseRecipeResponse } from './response-parser';

/**
 * Orchestration layer: coordinates validation, API calls, and response parsing
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Parse request body
    const body: RecipeRequest = await request.json();

    // 2. Validate input
    const validationError = validateRecipeRequest(body);
    if (validationError) {
      return NextResponse.json(validationError, {
        status: validationError.status,
      });
    }

    // 3. Call OpenAI
    const responseText = await callOpenAIForRecipe(body);

    // 4. Parse and validate response
    const result = parseRecipeResponse(responseText);

    // Check if parsing returned an error
    if ('status' in result) {
      return NextResponse.json(result as ApiError, {
        status: (result as ApiError).status,
      });
    }

    // 5. Return successful recipe
    return NextResponse.json(result as Recipe, { status: 200 });
  } catch (error) {
    console.error('API Error:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'Failed to generate recipe';

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
