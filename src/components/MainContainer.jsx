import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import { VideoBackground } from "./VideoBackground";
export default function MainContainer() {
  const movies = useSelector((state) => state.movies?.nowPlayingMovies);
  if (!movies) return null;

  const mainMovie = movies[0];
  const { title, overview, id } = mainMovie;

  return (
    <>
      <div className=" relative h-[92vh]">
        <VideoTitle title={title} id={id} overview={overview} />
        <VideoBackground id={id} />
      </div>
    </>
  );
}
