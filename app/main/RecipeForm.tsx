import React from 'react';

interface Props {
  ingredients: string;
  setIngredients: (v: string) => void;
  diet: string;
  setDiet: (v: string) => void;
  cuisine: string;
  setCuisine: (v: string) => void;
  mealType: string;
  setMealType: (v: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

export default function RecipeForm({
  ingredients,
  setIngredients,
  diet,
  setDiet,
  cuisine,
  setCuisine,
  mealType,
  setMealType,
  onSubmit,
  loading,
}: Props) {
  return (
    <section className="bg-white rounded-lg border border-gray-300 shadow-sm">
      <div className="p-4 wborder-b border-gray-200">
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

      <div className="p-4 flex justify-end">
        <button
          onClick={onSubmit}
          disabled={loading}
          className="px-6 py-2 bg-leafy-green text-white font-semibold rounded hover:bg-leafy-green/90 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Generating...' : 'Generate Recipe'}
        </button>
      </div>
    </section>
  );
}
