import { useNavigate } from "react-router-dom";

export default function VideoTitle({ title, id, overview }) {
  const navigate = useNavigate();
  function handledetails() {
    navigate(`/movie/${id}`);
  }

  function handleClick() {
    navigate(`/video/${id}`);
  }
  return (
    <div className="absolute pt-[7%] pb-20 w-full h-[90%] flex items-center z-20">
      <div className="px-12 md:px-16 lg:px-20 max-w-xl lg:max-w-2xl space-y-3 md:space-y-4">
        <h1 className="text-5xl font-bold text-white leading-tight drop-shadow-2xl">
          {title}
        </h1>

        <p className="text-base md:text-lg lg:text-xl text-gray-100 leading-relaxed line-clamp-3 md:line-clamp-4 drop-shadow-lg max-w-lg lg:max-w-xl">
          {overview}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-1">
          <button
            onClick={handleClick}
            className="flex items-center justify-center gap-2 bg-white text-black px-6 md:px-8 py-1.5 rounded font-semibold text-base md:text-lg hover:bg-gray-200 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 min-w-[120px]"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            Play
          </button>

          <button
            onClick={handledetails}
            className="flex items-center justify-center gap-2 bg-gray-500/70 text-white px-6 md:px-8 py-2.5 md:py-3 rounded font-semibold text-base md:text-lg hover:bg-gray-500/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 min-w-[140px] backdrop-blur-sm"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
            Info
          </button>
        </div>
      </div>
    </div>
  );
}
