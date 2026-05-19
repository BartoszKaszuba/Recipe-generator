"use client";

import { useState } from "react";
import Header from "./main/Header";
import Hero from "./main/Hero";
import ResponseJson from "./main/ResponseJson";
import ErrorAlert from "./main/ErrorAlert";
import RecipeForm from "./main/RecipeForm";

interface Recipe {
  recipeName: string;
  summary: string;
  ingredients: string[];
  instructions: string[];
  tips: string;
}

export default function Home() {
  const [ingredients, setIngredients] = useState("");
  const [diet, setDiet] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [mealType, setMealType] = useState("");
  const [response, setResponse] = useState<Recipe | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateRecipe = async () => {
    setError("");
    setResponse(null);

    if (!ingredients.trim()) {
      setError("Please enter at least one ingredient");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
        setError(data.error || "Failed to generate recipe");
        return;
      }

      setResponse(data);
    } catch (err) {
      setError("Network error. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-cream p-6">
      <div className="max-w-2xl mx-auto">
        <Header />

        {!ingredients.trim() && <Hero />}

        <ResponseJson data={response} />

        <ErrorAlert message={error} />

        <RecipeForm
          ingredients={ingredients}
          setIngredients={setIngredients}
          diet={diet}
          setDiet={setDiet}
          cuisine={cuisine}
          setCuisine={setCuisine}
          mealType={mealType}
          setMealType={setMealType}
          onSubmit={handleGenerateRecipe}
          loading={loading}
        />
      </div>
    </div>
  );
}
