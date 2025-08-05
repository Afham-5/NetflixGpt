import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function MovieVideo() {
  const [trailerid, settrailerid] = useState("");
  const [videoNotAvailable, setVideoNotAvailable] = useState(false);
  const { id } = useParams();

  async function getVideo() {
    try {
      const res = await fetch(
        `/api/tmdb?path=movie/${id}/videos&query=language=en-US`
      );
      const data = await res.json();
      const VideoArray = data.results;

      if (!VideoArray || VideoArray.length === 0) {
        setVideoNotAvailable(true);
        return;
      }

      const mainVideo = VideoArray.filter(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      const Video_key =
        mainVideo.length !== 0 ? mainVideo[0].key : VideoArray[0].key;

      if (Video_key) {
        settrailerid(Video_key);
        setVideoNotAvailable(false);
      } else {
        setVideoNotAvailable(true);
      }
    } catch (error) {
      console.error("Error fetching video:", error);
      setVideoNotAvailable(true);
    }
  }

  useEffect(() => {
    getVideo();
  }, [id]);

  if (videoNotAvailable) {
    return (
      <div className="fixed top-0 left-0 w-screen h-screen bg-gray-500 flex items-center justify-center z-50">
        <div className="text-red-500 text-xl font-bold text-center">
          Video is not available for this movie
        </div>
      </div>
    );
  }

  return (
    <>
      <iframe
        className="fixed top-0 left-0 w-screen h-screen border-none z-50"
        src={
          "https://www.youtube.com/embed/" +
          trailerid +
          "?&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&loop=1&playlist=" +
          trailerid +
          "&title=0"
        }
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        style={{
          border: "none",
          objectFit: "fill",
        }}
      ></iframe>
    </>
  );
}
