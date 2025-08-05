import { useState } from "react";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { addGptMovieResult } from "../utils/gptSlice";
import GptMovieDisplay from "./GptMovieDisplay";
import Loading from "./Loading";

export default function GptSearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false); // NEW: track if error happened
  const gptMovieResults = useSelector((state) => state.gpt.gptMovieResults);
  const dispatch = useDispatch();

  async function get_movie_data(movie) {
    try {
      const movie_data = await fetch(
        `/api/tmdb?path=search/movie&query=${movie}&include_adult=false&language=en-US&page=1`
      );
      const json = await movie_data.json();
      return json.results;
    } catch (err) {
      console.error("TMDB fetch error:", err);
      return []; // return empty if failed
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError(false); // reset previous error state

    const systemPrompt = `You are a movie recommendation system. Given a user's query, suggest 15 suitable movie titles that match their interest.
    Only respond with movie names, separated by commas. Do not include any descriptions, numbering, or extra text.
    The format should be like this:  
    Baazigar, 3 Idiots, Darr, Sholay, Lagaan, Mughal-e-Azam, Anand, Deewar, Pakeezah, Guide
    User's query: ${searchQuery}`;

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: systemPrompt }),
      });

      const data = await res.json();

      if (res.ok && data?.text) {
        const gpt_movies = data.text.split(", ");
        const promise_array = gpt_movies.map((movie) => get_movie_data(movie));
        const tmdb_results = await Promise.all(promise_array);

        dispatch(addGptMovieResult(tmdb_results));
        setIsLoading(false);
      } else {
        console.error("API response error:", data);
        setError(true);
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Gemini API error:", err);
      setError(true);
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage:
          "url('https://assets.nflxext.com/ffe/siteui/vlv3/05e91faa-6f6d-4325-934e-5418dcc2567b/web/IN-en-20250630-TRIFECTA-perspective_159086b1-425f-435b-bcd5-1ed8039cdef9_small.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30 z-0"></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        {/* Search Form */}
        <div className="mt-32 flex justify-center px-6">
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-8 max-w-3xl w-full"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What would you like to watch today?"
              className="flex-1 px-6 py-4 text-lg text-white bg-black bg-opacity-70 border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 backdrop-blur-sm"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium text-base rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
          </form>
        </div>

        <div className="flex-1 flex items-center justify-center">
          {isLoading && (
            <>
              <div className="fixed inset-0 bg-black bg-opacity-75 z-20"></div>
              <div className="fixed inset-0 flex items-center justify-center z-30">
                <Loading text="Finding perfect movies for you" />
              </div>
            </>
          )}

          {!isLoading && error && (
            <div className="text-red-500 bg-black bg-opacity-40 px-6 py-4 rounded-lg text-xl font-semibold text-center">
              Error in Fetching Movies. Try after some time.
            </div>
          )}

          {!isLoading && !error && <GptMovieDisplay />}
        </div>
      </div>
    </div>
  );
}
