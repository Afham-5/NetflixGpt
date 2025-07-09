import Header from "./Header";
import AuthForm from "./AuthForm";
import { useState } from "react";
export default function Login() {
  const [mode, setmode] = useState("login");
  function onToggleMode() {
    setmode((prev) => {
      if (prev === "login") return "signup";
      else return "login";
    });
  }
  function onSubmit() {
    if (mode === "login") {
      console.log("login form submitted");
    } else {
      console.log("sign up form submitted");
    }
  }
  return (
    <>
      <Header />
      <div className="w-full h-screen absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/05e91faa-6f6d-4325-934e-5418dcc2567b/web/IN-en-20250630-TRIFECTA-perspective_159086b1-425f-435b-bcd5-1ed8039cdef9_small.jpg"
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute w-full h-screen flex justify-center items-center z-50">
        <AuthForm mode={mode} onSubmit={onSubmit} onToggleMode={onToggleMode} />
      </div>
    </>
  );
}
