import Header from "./Header";
import AuthForm from "./AuthForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
export default function Login() {
  const [mode, setmode] = useState("login");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function onToggleMode() {
    setmode((prev) => {
      if (prev === "login") return "signup";
      else return "login";
    });
  }
  function onSubmit(data) {
    console.log(data);
    const email = data.email;
    const password = data.password;
    const name = data.name;
    if (mode === "login") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(email + " " + password);
          // Signed up
          const user = userCredential.user;

          updateProfile(user, {
            displayName: name,
          })
            .then(() => user.reload())
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName }));
            })
            .catch((error) => {
              // An error occurred
              // ...
              console.log(error);
            });

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);

          // ..
        });
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
