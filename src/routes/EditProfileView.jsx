import AuthProvider from "../components/AuthProvider";
import DashboardWrapper from "../components/DashboardWrapper";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getProfilePhotoUrl,
  getUserPublicProfileInfo,
  setUserProfilePhoto,
  updateUser,
} from "../firebase/firebase";
import style from "./editProfileView.module.css";
import styleLinks from "../components/publicLink.module.css";
import tree from "../assets/tree.svg";
import PublicLink from "../components/PublicLink";

const EditProfileView = () => {
  const navigate = useNavigate();
  const [currentUser, setCurentUser] = useState({});
  const [state, setState] = useState(0);
  const [profileUrl, setProfileUrl] = useState(null);
  const [links, setLinks] = useState(null);

  const fileRef = useRef(null);
  const linkRef = useRef(null);

  useEffect(() => {
    const getInfo = async () => {
      if (currentUser.uid) {
        const userInfo = await getUserPublicProfileInfo(currentUser.uid);
        setLinks(userInfo.linksInfo);
      }
    };

    getInfo();
  }, [currentUser]);

  async function handleUserLoggedIn(user) {
    setCurentUser(user);
    let url;
    if (user.profilePicture) {
      url = await getProfilePhotoUrl(user.profilePicture);
    }

    setProfileUrl(url);

    setState(2);
  }
  function handleUserNotRegistered(user) {
    navigate("/login");
  }
  function handleUserNotLoggedIn(user) {
    navigate("/login");
  }

  function handleOpenFilePicker() {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }

  async function handleChangeFile(e) {
    const files = e.target.files;
    const fileReader = new FileReader();

    if (fileReader && files && files.length > 0) {
      fileReader.readAsArrayBuffer(files[0]);
      fileReader.onload = async function () {
        const imageData = fileReader.result;

        const res = await setUserProfilePhoto(currentUser.uid, imageData);

        if (res) {
          const tmpUser = { ...currentUser };
          tmpUser.profilePicture = res.metadata.fullPath;
          await updateUser(tmpUser);
          setCurentUser({ ...tmpUser });
          const url = await getProfilePhotoUrl(tmpUser.profilePicture);
          setProfileUrl(url);
        }
      };
    }
  }

  if (state !== 2) {
    return (
      <AuthProvider
        onUserLoggedIn={handleUserLoggedIn}
        onUserNotLoggedIn={handleUserNotLoggedIn}
        onUserNotRegistered={handleUserNotRegistered}
      ></AuthProvider>
    );
  }

  return (
    <DashboardWrapper>
      <div>
        <h2>Editar informacion de perfil</h2>

        <div className={style.profilePictureContainer}>
          <div>
            <img src={profileUrl || tree} alt="" />
          </div>

          <div>
            <button
              className={`btn ${style.pickerBtn}`}
              onClick={handleOpenFilePicker}
            >
              Elige nueva foto de perfil
            </button>
            <input
              className={style.profileInput}
              type="file"
              ref={fileRef}
              onChange={handleChangeFile}
            />
          </div>
        </div>

        {currentUser?.username && (
          <div className={style.shareContainer}>
            <a
              ref={linkRef}
              href={` https://mytreelink.netlify.app/u/${currentUser?.username}`}
            >
              https://mytreelink.netlify.app/u/{currentUser?.username}
            </a>
            <button
              className={style.copyBtn}
              onClick={() =>
                navigator.clipboard.writeText(linkRef.current.innerText)
              }
            >
              <span className="material-icons">content_copy</span>
            </button>
          </div>
        )}
      </div>

      <div className={styleLinks.publicLinksContainer}>
        {links &&
          links?.map(({ url, title, docId }) => (
            <PublicLink key={docId} url={url} title={title} />
          ))}
      </div>
    </DashboardWrapper>
  );
};

export default EditProfileView;
