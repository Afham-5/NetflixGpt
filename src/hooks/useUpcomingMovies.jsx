import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUpcomingMovies } from "../utils/MoviesSlice";
export default function useUpcomingMovies() {
  const dispatch = useDispatch();
  async function UpcomingMovies() {
    const res = await fetch(
      "/api/tmdb?path=movie/upcoming&query=language=en-US&include_adult=false&page=1"
    );
    const data = await res.json();
    const filtered = data?.results?.filter(
      (movie) => movie.original_language !== "ja"
    );
    dispatch(addUpcomingMovies(filtered));
  }
  useEffect(() => {
    UpcomingMovies();
  }, []);
}
