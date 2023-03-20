import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/AuthProvider";
import DashboardWrapper from "../components/DashboardWrapper";
import { v4 as uuidv4 } from "uuid";
import {
  deleteLink,
  getLinks,
  insertNewLink,
  updateLink,
} from "../firebase/firebase";
import Link from "../components/Link";
import style from "./dashboardView.module.css";
import styleLinks from "../components/link.module.css";

const DashboardView = () => {
  const navigate = useNavigate();
  const [currentUser, setCurentUser] = useState({});
  const [state, setState] = useState(0);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState([]);

  async function handleUpdateLink(docId, title, url) {
    const link = links.find((item) => item.docId === docId);
    link.title = title;
    link.url = url;
    await updateLink(docId, link);
  }

  async function handleDeleteLink(docId) {
    await deleteLink(docId);
    const tmp = links.filter((link) => {
      return link.docId !== docId;
    });

    setLinks([...tmp]);
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    addLink();
  }

  function addLink() {
    if (title !== "" && url !== "") {
      const newLink = {
        id: uuidv4(),
        title: title,
        url: url,
        uid: currentUser.uid,
      };
      const res = insertNewLink(newLink);
      newLink.docId = res.id;
      setTitle("");
      setUrl("");
      setLinks([...links, newLink]);
    }
  }

  function handleOnChange(e) {
    const value = e.target.value;
    if (e.target.name === "title") {
      setTitle(value);
    } else {
      setUrl(value);
    }
  }

  async function handleUserLoggedIn(user) {
    setCurentUser(user);
    setState(2);
    const resLinks = await getLinks(user.uid);
    setLinks(resLinks);
  }
  function handleUserNotRegistered(user) {
    navigate("/login");
  }
  function handleUserNotLoggedIn(user) {
    navigate("/login");
  }

  if (state === 0) {
    return (
      <AuthProvider
        onUserLoggedIn={handleUserLoggedIn}
        onUserNotLoggedIn={handleUserNotLoggedIn}
        onUserNotRegistered={handleUserNotRegistered}
      >
        <h1>loading...</h1>
      </AuthProvider>
    );
  }

  return (
    <DashboardWrapper>
      <div>
        <h1>Dashboard</h1>

        <form
          action=""
          onSubmit={handleOnSubmit}
          className={style.entryContainer}
        >
          <label htmlFor="title">Title</label>
          <input
            className="input"
            type="text"
            name="title"
            onChange={handleOnChange}
            value={title}
          />

          <label htmlFor="url">URL</label>
          <input
            className="input"
            type="text"
            name="url"
            onChange={handleOnChange}
            value={url}
          />

          <input className="btn" type="submit" value={"Crear nuevo link"} />
        </form>

        <div className={styleLinks.linksContainer}>
          {links.map((link) => (
            <Link
              key={link.id}
              docId={link.docId}
              url={link.url}
              title={link.title}
              onUpdate={handleUpdateLink}
              onDelete={handleDeleteLink}
            />
          ))}
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default DashboardView;
