import MovieList from "./MovieList";
import { useSelector } from "react-redux";
export default function SecondaryContainer() {
  const movies = useSelector((state) => state.movies?.nowPlayingMovies);
  const Popularmovies = useSelector((state) => state.movies?.PopularMovies);
  const TopRatedMovies = useSelector((state) => state.movies?.TopRatedMovies);
  const UpcomingMovies = useSelector((state) => state.movies?.UpcomingMovies);
  // console.log(UpcomingMovies);
  if (!movies) return null;
  if (!Popularmovies) return null;
  if (!TopRatedMovies) return null;
  if (!UpcomingMovies) return null;

  // console.log(movies);

  return (
    <div className=" bg-black text-white pt-[10vh]">
      <div className=" -mt-[27vh]">
        <div>
          <MovieList movies={movies} title={"Now Playing Movies"} />
          <MovieList movies={Popularmovies} title={"Popular Movies"} />
          <MovieList movies={TopRatedMovies} title={"TopRated Movies"} />
          <MovieList movies={UpcomingMovies} title={"Upcoming Movies"} />
        </div>
      </div>
    </div>
  );
}
