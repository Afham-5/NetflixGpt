import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../utils/MoviesSlice";
export default function usePopularMovies() {
  const dispatch = useDispatch();
  async function PopularMovies() {
    const res = await fetch(
      "/api/tmdb?path=discover/movie&query=sort_by=popularity.desc&include_adult=false&language=en-US&page=2"
    );
    const data = await res.json();
    const filtered = data?.results?.filter(
      (movie) => movie.original_language !== "ja"
    );
    dispatch(addPopularMovies(filtered));
  }
  useEffect(() => {
    PopularMovies();
  }, []);
}
