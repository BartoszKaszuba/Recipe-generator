import OpenAI from 'openai';
import { RecipeRequest, Message } from './types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are DishDash, an AI recipe assistant. Respond ONLY with valid JSON.
- When user provides ingredients: return recipe JSON with recipeName, summary, ingredients (array), instructions (array), tips
- When clarification needed: return {"followUp": "your question"}
- When user provides preferences: include "thanks" field with brief acknowledgement
Never include text outside JSON.`;

export async function callOpenAIForRecipe(body: RecipeRequest): Promise<string> {
  const messages = buildMessages(body);

  try {
    const message = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      max_tokens: 1024,
      messages: messages as OpenAI.Chat.Completions.ChatCompletionMessageParam[],
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

function buildMessages(body: RecipeRequest): Message[] {
  // Multi-turn: use messages array (last 8 for cost control)
  if (body.messages && body.messages.length > 0) {
    const hasSystem = body.messages.some(m => m.role === 'system');
    const messages: Message[] = [];
    if (!hasSystem) {
      messages.push({ role: 'system', content: SYSTEM_PROMPT });
    }
    messages.push(...body.messages.slice(-8));
    return messages;
  }

  // Single-shot: build from ingredients + options
  let prompt = `Generate a recipe from: ${body.ingredients || 'any available ingredients'}`;
  if (body.diet) prompt += `. Diet: ${body.diet}`;
  if (body.cuisine) prompt += `. Cuisine: ${body.cuisine}`;
  if (body.mealType) prompt += `. Type: ${body.mealType}`;

  return [
    { role: 'system', content: SYSTEM_PROMPT },
    { role: 'user', content: prompt }
  ];
}
