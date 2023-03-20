import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PublicLink from "../components/PublicLink";
import {
  existsUsername,
  getProfilePhotoUrl,
  getUserPublicProfileInfo,
} from "../firebase/firebase";
import style from "./publicProfileView.module.css";
import styleLinks from "../components/publicLink.module.css";

const PublicProfileView = () => {
  const params = useParams();
  const [profile, setProfile] = useState(null);
  const [url, setUrl] = useState(null);
  const [state, setState] = useState(0);

  useEffect(() => {
    const username = params.username;

    async function getProfile() {
      try {
        const userUid = await existsUsername(username);
        if (userUid) {
          const userInfo = await getUserPublicProfileInfo(userUid);
          setProfile(userInfo);
          const url = await getProfilePhotoUrl(
            userInfo.profileInfo.profilePicture
          );
          setUrl(url);
        } else {
          setState(7);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getProfile();
  }, [params]);

  if (state === 7) {
    return (
      <div>
        <h1>No existe usuario</h1>
      </div>
    );
  }

  return (
    <div className={style.profileContainer}>
      <div className={style.profilePicture}>
        <img src={url} alt="" />
      </div>
      <h2>{profile?.profileInfo.username}</h2>
      <h3>{profile?.profileInfo.displayname}</h3>
      <div className={styleLinks.publicLinksContainer}>
        {profile?.linksInfo.map(({ url, title, docId }) => (
          <PublicLink key={docId} url={url} title={title} />
        ))}
      </div>
    </div>
  );
};

export default PublicProfileView;
