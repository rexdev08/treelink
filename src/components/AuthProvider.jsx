import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import {
  auth,
  getUserInfo,
  registererNewUser,
  userExits,
} from "../firebase/firebase";

const AuthProvider = ({
  children,
  onUserLoggedIn,
  onUserNotLoggedIn,
  onUserNotRegistered,
}) => {
  useEffect(() => {
    onAuthStateChanged(auth, handleUserStateChanged);
  }, []);

  const handleUserStateChanged = async (user) => {
    if (user) {
      const isRegisterd = await userExits(user.uid);
      if (isRegisterd) {
        const userInfo = await getUserInfo(user.uid);
        if (userInfo.processCompleted) {
          onUserLoggedIn(userInfo);
        } else {
          onUserNotRegistered(userInfo);
        }
      } else {
        await registererNewUser({
          uid: user.uid,
          displayname: user.displayName,
          profilePicture: "",
          username: "",
          processCompleted: false,
        });
        onUserNotRegistered(user);
      }
    } else {
      onUserNotLoggedIn(user);
    }
  };

  return <div>{children}</div>;
};

export default AuthProvider;
