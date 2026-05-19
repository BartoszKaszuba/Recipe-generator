import OpenAI from 'openai';
import { RecipeRequest } from './types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function callOpenAIForRecipe(body: RecipeRequest): Promise<string> {
  const prompt = buildPrompt(body);

  try {
    const message = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const responseText = message.choices[0]?.message?.content || '';
    return responseText;
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      throw new Error(`OpenAI service error: ${error.message}`);
    }
    throw error;
  }
}

function buildPrompt(body: RecipeRequest): string {
  let prompt = `Generate a recipe based on these ingredients: ${body.ingredients}.`;

  if (body.diet) {
    prompt += ` Diet restriction: ${body.diet}.`;
  }
  if (body.cuisine) {
    prompt += ` Cuisine preference: ${body.cuisine}.`;
  }
  if (body.mealType) {
    prompt += ` Meal type: ${body.mealType}.`;
  }

  prompt += `

Please respond with ONLY a valid JSON object in this exact format, with no additional text:
{
  "recipeName": "Name of the recipe",
  "summary": "Brief description of the dish",
  "ingredients": ["ingredient 1", "ingredient 2", "ingredient 3"],
  "instructions": ["Step 1", "Step 2", "Step 3"],
  "tips": "Any cooking tips or variations"
}`;

  return prompt;
}
