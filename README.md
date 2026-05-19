# DishDash - AI-Powered Recipe Generator

## Goal

Build an AI-powered recipe generator web app that helps users create personalized recipes from ingredients they have on hand using OpenAI's language model.

---

## Journey

### What do I need as a user?

- An easy way to input available ingredients
- AI-generated recipes tailored to preferences
- Clear instructions how to request a recepy

### What is the user flow?

1. User lands on app → sees hero section with input form
2. Enters ingredients and optional preferences
3. Submits → AI generates recipe
4. AI may ask clarifying questions (spice level, dietary restrictions, etc.)
5. User replies to questions → AI adjusts recipe
6. Final recipe displayed with full details

### What does it look like?

- Clean, modern interface with Material Design principles
- Leafy green, root vegetable, and earthy neutral color palette (10-30-60 rule)
- Chat-like interface for multi-turn interactions
- Scrollable message history
- Hero section with ingredient input form
- Recipe cards with ingredients, instructions, and tips

### How do I keep it small?

- Single Next.js page with server-side API route
- Modular component structure (Header, Hero, RecipeForm, ResponseJson, ChatContainer)
- Reuse Tailwind CSS instead of custom styles
- Keep conversation history to last 8 messages (cost control)
- Minimal dependencies (openai, next, react, tailwindcss)

### How do I prototype digitally?

- Used Stitch for rapid wireframing and design exploration
- Manualy adjust the designs in accordane with the concept
- Built responsive design that works on desktop

### What design tools are good for fast prototyping?

- **Stitch** - Fast, AI-assisted design prototyping
- **Figma** - Component libraries and design systems
- **Tailwind CSS** - Rapid UI development without custom CSS

### How do I create professional design?

- Follow Material Design 3 principles
- Use consistent spacing (8px grid)
- Implement 10-30-60 color rule (60% neutral, 30% secondary, 10% accent)
- Ensure accessibility (contrast ratios, readable fonts)
- Test on multiple devices

### What design system do I use?

- **Material Design 3** principles with custom tailoring
- Color palette: Leafy greens (primary), root vegetables (secondary), crisp neutrals (background)
- Tailwind CSS with custom color config for brand colors

### What technologies work well?

- **Next.js App Router** - Modern React framework with built-in API routes
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first styling aligned with Material Design
- **OpenAI API** - Server-side LLM calls for security

### What tools do I use?

- Next.js 14+
- React 18
- TypeScript
- Tailwind CSS
- OpenAI SDK
- Node.js 18+

---

## Overview of the Application

**Summary (4 sentences):**

DishDash is an interactive AI recipe generator that transforms available ingredients into personalized recipes through multi-turn conversations. Users input ingredients and optional preferences, then engage with the AI which can ask clarifying questions to refine the recipe. The app maintains full conversation history, allowing users to see all interactions in a scrollable chat interface. Backend processes all AI requests server-side using OpenAI's API, ensuring security and providing structured JSON responses for recipe data.

### How the Next.js Route Works

The API endpoint at `/api/recipe` accepts POST requests with either legacy single-shot parameters or a multi-turn `messages` array:

1. **Request Format**: Client sends `{ messages: [{role, content}, ...] }` or `{ ingredients, diet, cuisine, mealType }`
2. **Backend Processing**:
   - Server prepends a system prompt instructing the model to return JSON
   - Forwards messages to OpenAI's chat completion API
   - Truncates history to last 8 messages for cost control
3. **Response Format**: Returns either a full recipe JSON or `{followUp: "question"}` or `{thanks: "acknowledgement"}`
4. **Error Handling**: Catches parsing errors and returns them as `followUp` messages

### Quick Explanation of Frontend Components

- **Header** - App branding
- **Hero** - Welcome section with app description (shown on initial load)
- **RecipeForm** - Input form for ingredients and preferences
- **ResponseJson** - Displays formatted recipe cards with ingredients, instructions, and tips
- **ErrorAlert** - Shows validation errors and API failures

---

## Quick Start

### Prerequisites

- Node.js 18+ installed
- OpenAI API key (get one at https://platform.openai.com/api-keys)

### Setup & Installation

1. **Clone or navigate to the project:**

   ```bash
   cd Recipe-generator
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Add your OpenAI API key** to `.env.local`:

   ```bash
   echo "OPENAI_API_KEY=sk-your_actual_key_here" > .env.local
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

5. **Open in browser:**
   ```
   http://localhost:3000
   ```

### Usage

- Enter ingredients in the text field
- (Optional) Add diet preference, cuisine, or meal type
- Click "Generate Recipe"
- View your recipe card with full details
- Scroll up to see full conversation history
