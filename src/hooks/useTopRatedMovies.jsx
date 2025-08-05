import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTopRatedMovies } from "../utils/MoviesSlice";
export default function useTopRatedMovies() {
  const dispatch = useDispatch();
  async function TopRatedMovies() {
    const res = await fetch(
      "/api/tmdb?path=movie/top_rated&query=language=en-US&include_adult=false&page=1"
    );
    const data = await res.json();
    const filtered = data?.results?.filter(
      (movie) => movie.original_language !== "ja"
    );
    dispatch(addTopRatedMovies(filtered));
  }
  useEffect(() => {
    TopRatedMovies();
  }, []);
}
