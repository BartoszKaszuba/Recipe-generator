"use client";

import { useState, useRef, useEffect } from "react";
import Header from "./page components/Header";
import Hero from "./page components/Hero";
import ResponseJson from "./page components/ResponseJson";
import ErrorAlert from "./page components/ErrorAlert";
import RecipeForm from "./page components/RecipeForm";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

interface Recipe {
  recipeName?: string;
  summary?: string;
  ingredients?: string[];
  instructions?: string[];
  tips?: string;
  followUp?: string;
  thanks?: string;
}

export default function Home() {
  const [ingredients, setIngredients] = useState("");
  const [diet, setDiet] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [mealType, setMealType] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [followUpReply, setFollowUpReply] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleGenerateRecipe = async (userMessage?: string) => {
    setError("");

    if (!userMessage && !ingredients.trim()) {
      setError("Please enter at least one ingredient");
      return;
    }

    setLoading(true);
    let updatedMessages = [...messages];

    try {
      // Build user message
      if (!userMessage && ingredients.trim()) {
        // First submission: build from form inputs
        let msg = `Generate a recipe from these ingredients: ${ingredients}`;
        if (diet) msg += `. Diet: ${diet}`;
        if (cuisine) msg += `. Cuisine: ${cuisine}`;
        if (mealType) msg += `. Type: ${mealType}`;

        updatedMessages = [{ role: "user", content: msg }];
      } else if (userMessage) {
        // Follow-up reply
        updatedMessages.push({ role: "user", content: userMessage });
      }

      // Optimistic UI update
      setMessages(updatedMessages);
      setFollowUpReply("");

      // API call
      const res = await fetch("/api/recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data: Recipe = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to generate recipe");
        setMessages(updatedMessages); // Keep user message even on error
        return;
      }

      // Add assistant response
      const assistantContent = data.followUp 
        ? `Follow-up: ${data.followUp}`
        : `Recipe: ${JSON.stringify(data)}`;

      updatedMessages.push({
        role: "assistant",
        content: assistantContent,
      });

      setMessages(updatedMessages);

      // Clear form on first submission
      if (!userMessage && ingredients.trim()) {
        setIngredients("");
        setDiet("");
        setCuisine("");
        setMealType("");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Parse latest assistant response for display
  const getLatestResponse = (): Recipe | null => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === "assistant") {
        try {
          const content = messages[i].content;
          if (content.startsWith("Follow-up:")) {
            return { followUp: content.replace("Follow-up: ", "") };
          }
          if (content.startsWith("Recipe:")) {
            const jsonStr = content.replace("Recipe: ", "");
            return JSON.parse(jsonStr);
          }
        } catch (e) {
          console.error("Failed to parse response:", e);
        }
      }
    }
    return null;
  };

  const latestResponse = getLatestResponse();

  return (
    <div className="min-h-screen bg-neutral-cream p-6 flex flex-col">
      <div className="max-w-2xl mx-auto w-full flex flex-col flex-1">
        <Header />

        {messages.length === 0 && <Hero />}

        {/* Chat container - scrollable */}
        <div className="flex-1 overflow-y-auto mb-6 bg-white rounded-lg p-4 border border-gray-200 min-h-96">
          {messages.length === 0 ? (
            <p className="text-gray-400 text-center py-8">Start a conversation...</p>
          ) : (
            <>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`mb-4 flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.role === "user"
                        ? "bg-orange-500 text-white"
                        : "bg-gray-200 text-gray-900"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">
                      {msg.role === "assistant" && msg.content.startsWith("Follow-up:")
                        ? msg.content.replace("Follow-up: ", "")
                        : msg.role === "assistant" && msg.content.startsWith("Recipe:")
                        ? "Recipe generated!"
                        : msg.content}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </>
          )}
        </div>

        {/* Recipe display */}
        {latestResponse && <ResponseJson data={latestResponse} />}

        {/* Follow-up question UI */}
        {latestResponse?.followUp && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-900 mb-4">{latestResponse.followUp}</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={followUpReply}
                onChange={(e) => setFollowUpReply(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && followUpReply.trim() && handleGenerateRecipe(followUpReply)
                }
                placeholder="Your answer..."
                className="flex-1 px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                onClick={() => followUpReply.trim() && handleGenerateRecipe(followUpReply)}
                disabled={loading || !followUpReply.trim()}
                className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50"
              >
                {loading ? "..." : "Reply"}
              </button>
            </div>
          </div>
        )}

        <ErrorAlert message={error} />

        {/* Form - hide during follow-ups */}
        {!latestResponse?.followUp && (
          <RecipeForm
            ingredients={ingredients}
            setIngredients={setIngredients}
            diet={diet}
            setDiet={setDiet}
            cuisine={cuisine}
            setCuisine={setCuisine}
            mealType={mealType}
            setMealType={setMealType}
            onSubmit={() => handleGenerateRecipe()}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}
