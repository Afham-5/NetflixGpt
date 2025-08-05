import MovieCard from "./MovieCard";
export default function MovieList({ movies, title }) {
  return (
    <div className="pl-6 pt-4">
      <h1 className="text-xl md:text-xl font-semibold mb-2 ">{title}</h1>
      <div className="flex gap-4  overflow-x-scroll no-scrollbar">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie?.id} />
        ))}
      </div>
    </div>
  );
}
