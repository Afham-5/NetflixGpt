import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";

export default function GptMovieDisplay() {
  const tmdb_results = useSelector((store) => store.gpt?.GptMovies);
  if (!tmdb_results) return null;

  const final_movies = tmdb_results
    .map((movies) => (Array.isArray(movies) ? movies[0] : null))
    .filter((movie) => movie && movie.id);

  return (
    <div className="px-10 py-12 w-full grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 items-start">
      {final_movies.map((movie) => (
        <MovieCard key={movie?.id} movie={movie} />
      ))}
    </div>
  );
}
