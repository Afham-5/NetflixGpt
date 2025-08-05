import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import { useEffect, useState } from "react";
import { img_url } from "../utils/constants";
import Loading from "./Loading";
export default function MovieDetails() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const navigate = useNavigate();
  async function fetchDetails() {
    const res = await fetch(`/api/tmdb?path=movie/${id}&language=en-US`);
    const data = await res.json();
    return data;
  }

  useEffect(() => {
    async function fetchData() {
      const movie_details = await fetchDetails();
      setMovieDetails(movie_details);
    }

    fetchData();
  }, [id]);
  const formatRuntime = (minutes) => {
    if (!minutes) return "N/A";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).getFullYear();
  };

  function handleClick() {
    navigate(`/video/${id}`);
  }
  return (
    <>
      <Header />
      <div
        className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage:
            "url('https://assets.nflxext.com/ffe/siteui/vlv3/05e91faa-6f6d-4325-934e-5418dcc2567b/web/IN-en-20250630-TRIFECTA-perspective_159086b1-425f-435b-bcd5-1ed8039cdef9_small.jpg')",
        }}
      >
        {!movieDetails ? (
          <>
            <div className="absolute h-screen inset-0 bg-black bg-opacity-75"></div>
            <div className="relative z-10 flex items-center justify-center">
              <Loading text="Loading Movie Details" />
            </div>
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-black bg-opacity-75"></div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-[16vh] ">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 pb-[6vh] ">
                <div className="lg:col-span-1 flex justify-center lg:justify-start">
                  <div className="w-52 max-w-full">
                    <img
                      src={img_url + movieDetails?.poster_path}
                      alt={movieDetails.title || "Movie poster"}
                      className="w-full rounded-xl shadow-2xl hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>

                <div className="lg:col-span-2 text-white space-y-6">
                  <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                    {movieDetails.title ||
                      movieDetails.original_title ||
                      "Unknown Title"}
                  </h1>

                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full backdrop-blur-sm">
                      {formatDate(movieDetails.release_date)}
                    </span>
                    <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full backdrop-blur-sm">
                      {formatRuntime(movieDetails.runtime)}
                    </span>
                  </div>

                  {movieDetails.vote_average > 0 && (
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400 text-2xl">★</span>
                        <span className="text-xl font-bold">
                          {movieDetails.vote_average.toFixed(1)}
                        </span>
                      </div>
                      <span className="text-gray-400">
                        ({movieDetails.vote_count} votes)
                      </span>
                    </div>
                  )}

                  {movieDetails.genres && movieDetails.genres.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {movieDetails.genres.map((genre) => (
                        <span
                          key={genre.id}
                          className="bg-red-600 px-4 py-2 rounded-full text-sm font-medium"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-12">
                <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-10">
                  <p className="text-gray-200 text-lg leading-relaxed text-center">
                    {movieDetails.overview ||
                      "No overview available for this movie."}
                  </p>
                </div>
              </div>

              <div className="flex justify-center ">
                <button
                  onClick={handleClick}
                  className="group bg-red-600 hover:bg-red-700  text-white px-8 py-4 rounded-lg text-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-3"
                >
                  <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent"></div>
                  Watch Now
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
