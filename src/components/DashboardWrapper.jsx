import { Link } from "react-router-dom";
import { getSignOut } from "../firebase/firebase";
import style from "./dashboardWrapperView.module.css";
import tree from "../assets/tree.svg";

const DashboardWrapper = ({ children }) => {
  function handleSignOut() {
    getSignOut();
  }

  return (
    <div>
      <nav className={style.nav}>
        <div className={style.logo}>
          <img src={tree} alt="" width={60} />
        </div>
        <Link to={"/dashboard"}>Links</Link>
        <Link to={"/dashboard/profile"}>Perfil</Link>
        <Link onClick={handleSignOut}>Signout</Link>
      </nav>
      <div className="main-container">{children}</div>
    </div>
  );
};

export default DashboardWrapper;
