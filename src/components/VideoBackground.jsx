import { useEffect, useState } from "react";

export function VideoBackground({ id }) {
  const [trailerid, settrailerid] = useState("");

  async function getVideo() {
    const res = await fetch(
      `/api/tmdb?path=movie/${id}/videos&query=language=en-US`
    );
    const data = await res.json();
    const VideoArray = data.results;
    const mainVideo = VideoArray.filter(
      (video) => video?.type === "Trailer" && video?.site === "YouTube"
    );
    const Video_key =
      mainVideo?.length !== 0 ? mainVideo[0]?.key : VideoArray[0]?.key || "";
    settrailerid(Video_key);
  }

  useEffect(() => {
    getVideo();
  }, [id]);

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 z-10"></div>

      <iframe
        className=" w-full h-full pointer-events-none border-none "
        src={
          "https://www.youtube.com/embed/" +
          trailerid +
          "?&autoplay=1&mute=1&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&loop=1&playlist=" +
          trailerid
        }
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        style={{
          border: "none",
          objectFit: "fill",
          transform: "scale(1.4)",
          transformOrigin: "center",
        }}
      ></iframe>
    </div>
  );
}
