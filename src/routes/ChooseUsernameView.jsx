import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthProvider from "../components/AuthProvider";
import { existsUsername, updateUser } from "../firebase/firebase";
import style from "./chooseUsernameView.module.css";

const ChooseUsernameView = () => {
  const [state, setState] = useState();
  const [currentUser, setCurentUser] = useState({});
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  function handlerInputUsername(e) {
    setUsername(e.target.value);
  }

  async function handleContinue() {
    if (username !== "") {
      const exists = await existsUsername(username);
      if (exists) {
        setState(5);
      } else {
        const tmp = { ...currentUser };
        tmp.username = username;
        tmp.processCompleted = true;
        await updateUser(tmp);
        setState(6);
      }
    }
  }

  function handleUserLoggedIn(user) {
    navigate("/dashboard");
  }
  function handleUserNotRegistered(user) {
    setCurentUser(user);
    setState(3);
  }
  function handleUserNotLoggedIn(user) {
    navigate("/login");
  }

  if (state === 3 || state === 5) {
    return (
      <div className={style.chooseUsernameContainer}>
        <h1>Bienvenido {currentUser.displayName}</h1>
        <p>Para terminar el proceso elige un nombre de usuario</p>
        {state === 5 ? <p>el usuario ya existe</p> : ""}
        <div>
          <input className="input" type="text" onChange={handlerInputUsername} value={username} />
        </div>
        <div>
          <button className="btn" onClick={handleContinue}>Continuar</button>
        </div>
      </div>
    );
  }

  if (state === 6) {
    return (
      <div className={style.chooseUsernameContainer}>
        <h1>Felicidades! ya puedes ir al Dashboard a crear tus links</h1>
        <Link to={"/dashboard"}>continuar</Link>
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

export default ChooseUsernameView;
