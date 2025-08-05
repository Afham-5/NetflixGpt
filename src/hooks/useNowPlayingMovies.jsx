import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../utils/MoviesSlice";
export default function useNowPlayingMovies() {
  const dispatch = useDispatch();
  async function nowPlayingMovies() {
    const res = await fetch("/api/tmdb?path=movie/now_playing&query=page=1");
    const data = await res.json();
    dispatch(addNowPlayingMovies(data.results));
  }
  useEffect(() => {
    nowPlayingMovies();
  }, []);
}
