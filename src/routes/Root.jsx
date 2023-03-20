import style from "./root.module.css";
import { Link } from "react-router-dom";
import google from "../assets/google.png";

const Root = () => {
  return (
    <div className={style.mainContainer}>
      <div className={style.contentContainer}>
        <h1 className={style.Title}>Tree Link</h1>
        <Link to={"/login"} className={style.btn}>
          Comenzar
        </Link>
        <div className={style.instructions}>
          <span>
            1. Inicia sesion <img src={google} alt="" width={25} />oogle
          </span>
          <span>2. Elige un nombre de usuario</span>
          <span>3. Crea links y comparte tu perfil </span>
        </div>
      </div>
    </div>
  );
};

export default Root;
