'use client';

import { useState } from 'react';

interface Recipe {
  recipeName: string;
  summary: string;
  ingredients: string[];
  instructions: string[];
  tips: string;
}

export default function Home() {
  const [ingredients, setIngredients] = useState('');
  const [diet, setDiet] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [mealType, setMealType] = useState('');
  const [response, setResponse] = useState<Recipe | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateRecipe = async () => {
    setError('');
    setResponse(null);

    if (!ingredients.trim()) {
      setError('Please enter at least one ingredient');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ingredients,
          diet: diet || undefined,
          cuisine: cuisine || undefined,
          mealType: mealType || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to generate recipe');
        return;
      }

      setResponse(data);
    } catch (err) {
      setError('Network error. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-cream p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-leafy-green mb-2">DishDash</h1>
          <p className="text-gray-600">AI-powered recipe generator from ingredients</p>
        </div>

        {/* Response Display */}
        {response && (
          <div className="mb-6 p-4 bg-white rounded border border-gray-200">
            <h2 className="text-sm font-semibold mb-3 text-gray-700">API Response (JSON)</h2>
            <pre className="bg-gray-100 p-3 rounded overflow-x-auto text-xs">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded text-red-700">
            {error}
          </div>
        )}

        {/* Input Section */}
        <section className="bg-white rounded-lg border border-gray-300 shadow-sm">
          {/* Ingredients Textarea */}
          <div className="p-4 border-b border-gray-200">
            <label htmlFor="ingredients" className="block text-sm font-semibold text-gray-700 mb-2">
              Ingredients
            </label>
            <textarea
              id="ingredients"
              placeholder="Paste or type your ingredients here (e.g., chicken, tomatoes, garlic)..."
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              rows={4}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-leafy-green resize-none"
            />
          </div>

          {/* Optional Fields */}
          <div className="p-4 border-b border-gray-200 grid grid-cols-3 gap-3">
            <div>
              <label htmlFor="diet" className="block text-sm font-semibold text-gray-700 mb-2">
                Diet (optional)
              </label>
              <input
                id="diet"
                type="text"
                placeholder="e.g., vegan"
                value={diet}
                onChange={(e) => setDiet(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-leafy-green text-sm"
              />
            </div>
            <div>
              <label htmlFor="cuisine" className="block text-sm font-semibold text-gray-700 mb-2">
                Cuisine (optional)
              </label>
              <input
                id="cuisine"
                type="text"
                placeholder="e.g., Italian"
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-leafy-green text-sm"
              />
            </div>
            <div>
              <label htmlFor="mealType" className="block text-sm font-semibold text-gray-700 mb-2">
                Meal Type (optional)
              </label>
              <input
                id="mealType"
                type="text"
                placeholder="e.g., dinner"
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-leafy-green text-sm"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="p-4 flex justify-end">
            <button
              onClick={handleGenerateRecipe}
              disabled={loading}
              className="px-6 py-2 bg-leafy-green text-white font-semibold rounded hover:bg-leafy-green/90 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Generating...' : 'Generate Recipe'}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
