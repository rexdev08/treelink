import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/authProvider";
import style from "./loginView.module.css";

const LoginView = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(0);

  const handleOnClick = async () => {
    const signIn = async (provider) => {
      try {
        const res = await signInWithPopup(auth, provider);
        // console.log(res);
      } catch (error) {
        console.log(error);
      }
    };

    const googleProvider = new GoogleAuthProvider();
    await signIn(googleProvider);
  };

  function handleUserLoggedIn(user) {
    navigate("/dashboard");
  }
  function handleUserNotRegistered(user) {
    navigate("/choose-username");
  }
  function handleUserNotLoggedIn(user) {
    setState(4);
  }

  if (state === 4) {
    return (
      <div className={style.loginView}>
        <div>
          <h1>Link tree</h1>
        </div>
        <button className={style.provider} onClick={handleOnClick}>
          login with google
        </button>
      </div>
    );
  }

  if (state === 5) {
    return (
      <div>
        <h1>LoginView</h1>
        <button onClick={handleOnClick}>login with google</button>
      </div>
    );
  }

  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotLoggedIn={handleUserNotLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
    >
      <h1>loading...</h1>
    </AuthProvider>
  );
};

export default LoginView;
