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
  const [firebaseError, setFirebaseError] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onToggleMode() {
    setmode((prev) => (prev === "login" ? "signup" : "login"));
  }

  function onSubmit(data) {
    const { email, password, name } = data;
    setFirebaseError({});

    if (mode === "login") {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {})
        .catch((error) => {
          const errorCode = error.code;

          switch (errorCode) {
            case "auth/user-not-found":
              setFirebaseError({ email: "No user found with this email." });
              break;
            case "auth/wrong-password":
              setFirebaseError({ password: "Incorrect password." });
              break;
            case "auth/invalid-email":
              setFirebaseError({ email: "Invalid email format." });
              break;
            case "auth/too-many-requests":
              setFirebaseError({
                general: "Too many login attempts. Try again later.",
              });
              break;
            case "auth/invalid-credential":
              setFirebaseError({ general: "Invalid email or password." });
              break;
            default:
              setFirebaseError({ general: "Login failed. Please try again." });
          }
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          updateProfile(user, {
            displayName: name,
          })
            .then(() => user.reload())
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName }));
            });
        })
        .catch((error) => {
          const errorCode = error.code;

          switch (errorCode) {
            case "auth/email-already-in-use":
              setFirebaseError({ email: "Email is already registered." });
              break;
            case "auth/weak-password":
              setFirebaseError({
                password: "Password should be at least 6 characters.",
              });
              break;
            case "auth/invalid-email":
              setFirebaseError({ email: "Invalid email format." });
              break;
            default:
              setFirebaseError({ general: "Signup failed. Please try again." });
          }
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
        <AuthForm
          mode={mode}
          onSubmit={onSubmit}
          onToggleMode={onToggleMode}
          firebaseError={firebaseError}
        />
      </div>
    </>
  );
}
