import { useNavigate } from "react-router-dom";
import { img_url } from "../utils/constants";

export default function MovieCard({ movie, className = "w-36 rounded-md" }) {
  if (!movie?.poster_path) return null;
  const navigate = useNavigate();
  function handeClick(movie) {
    navigate(`/movie/${movie?.id}`);
  }
  return (
    <img
      src={img_url + movie.poster_path}
      alt="Poster"
      onClick={() => handeClick(movie)}
      className={`${className} cursor-pointer`}
    />
  );
}
