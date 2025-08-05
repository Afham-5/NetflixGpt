# NetflixGPT 🎬🤖

NetflixGPT is a full-stack movie recommendation web app that combines the power of **Gemini API** with **TMDB (The Movie Database)** to suggest personalized movie recommendations based on natural language queries. Users can also browse trending, top-rated, and upcoming movies — Netflix-style.

## 🚀 Features

- 🔐 Firebase Authentication (Sign In / Sign Up)
- 🎞️ TMDB API Integration for real-time movie data
- 🤖 Gemini-powered AI movie recommendations
- 🎥 YouTube Trailer Auto-Play Backgrounds
- 🔎 GPT Movie Search with dynamic rendering
- 💡 React + Redux-based state management
- 🌐 Deployed with Vercel (includes serverless functions)

## 🏗️ Tech Stack

- **Frontend:** React (with TailwindCSS)
- **Backend:** Serverless Functions (Vercel `/api` folder)
- **Authentication:** Firebase
- **AI:** Gemini API (Google AI)
- **Movie Data:** TMDB API
- **State Management:** Redux Toolkit
- **Deployment:** Vercel

## 🛠️ Environment Variables

Set the following in your Vercel dashboard or in `.env.local` for local development:

```env
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth
VITE_FIREBASE_PROJECT_ID=your_firebase_project
VITE_FIREBASE_APP_ID=your_firebase_app_id

TMDB_API_KEY=your_tmdb_key
GEMINI_API_KEY=your_gemini_key
```

## 📦 Running Locally

```bash
# Install dependencies
npm install

# Start development server
vercel dev
```

## 🚀 Deploying to Vercel

1. Push your code to GitHub (or any Git provider).
2. Import the repo into Vercel.
3. Set environment variables in the Vercel dashboard.
4. Run:

```bash
vercel deploy --prod
```

## 🙌 Acknowledgements

Thanks to the amazing open APIs and platforms that made this possible:

- [Firebase](https://firebase.google.com/)
- [TMDB](https://www.themoviedb.org/)
- [Google Gemini API](https://ai.google.dev)
- [Vercel](https://vercel.com/)
