import { useState, useRef, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const user = useSelector((store) => store.user);
  const dropdownRef = useRef();
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    console.log("Sign out clicked");
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="absolute z-10 w-full px-6 py-4 flex justify-between items-center bg-gradient-to-b from-black">
      <img
        className="w-44"
        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-07-01/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="Netflix_logo"
      />

      {user && (
        <div className="relative" ref={dropdownRef}>
          <img
            onClick={toggleDropdown}
            className="w-10 h-10 rounded cursor-pointer border border-gray-400"
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="Profile"
          />
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-black text-white rounded shadow-lg py-2 z-50 ">
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-4 py-2 hover:bg-gray-800"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
