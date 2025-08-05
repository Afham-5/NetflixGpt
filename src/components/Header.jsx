import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { changeisBrowse } from "../utils/MoviesSlice";
import netflixgpt_logo from "../assets/netflixgpt_logo.png";
export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const BrowsePagebool = useSelector((state) => state.movies?.isBrowse);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const dropdownRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const isDetailsPage = location.pathname.startsWith("/movie/");

  if (isDetailsPage) {
    return (
      <div className="absolute z-50 w-full px-6 pb-3 pt-1 flex justify-between items-center bg-gradient-to-b from-black">
        <img className="w-40 " src={netflixgpt_logo} alt="NetflixGpt Logo" />
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-[0.3rem] bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
        >
          <span className="text-lg">←</span>{" "}
          <span className="text-sm">Back</span>
        </button>
      </div>
    );
  }

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };
  function handleGPTSearch() {
    if (BrowsePagebool) {
      dispatch(changeisBrowse(false));
      navigate("/GptSearch");
    } else {
      dispatch(changeisBrowse(true));
      navigate("/browse");
    }
  }
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useLayoutEffect(() => {
    if (location.pathname === "/browse") {
      dispatch(changeisBrowse(true));
    } else if (location.pathname === "/GptSearch") {
      dispatch(changeisBrowse(false));
    }
  }, [location.pathname]);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
          })
        );

        if (location.pathname === "/") {
          navigate("/browse");
        }
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };

  return (
    <div className="absolute z-50 w-full px-6 pb-3 flex justify-between items-center bg-gradient-to-b from-black">
      <img className="w-44 " src={netflixgpt_logo} alt="NetflixGpt_logo" />

      {user && (
        <div className="flex items-center gap-8">
          <button
            onClick={handleGPTSearch}
            className="relative flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group"
          >
            <div className="absolute -top-2 -right-2 text-yellow-300 animate-bounce group-hover:animate-pulse text-s z-10">
              ⭐
            </div>
            <span className="text-sm">
              {BrowsePagebool ? "GPT Search" : "Browse Page"}
            </span>
          </button>

          <div className="relative" ref={dropdownRef}>
            <img
              onClick={toggleDropdown}
              className="w-10 h-10 rounded cursor-pointer border border-gray-400 hover:border-white transition-colors duration-200"
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              alt="Profile"
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-black text-white rounded shadow-lg py-2 z-50 border border-gray-700">
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-800 transition-colors duration-200"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
