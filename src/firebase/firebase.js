// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import {
  getFirestore,
  getDocs,
  doc,
  getDoc,
  addDoc,
  setDoc,
  deleteDoc,
  query,
  where,
  collection,
  updateDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  getBytes,
} from "firebase/storage";

const api = import.meta.env.VITE_API_KEY;
const authDomain = import.meta.env.VITE_AUTH_DOMAIN;
const project = import.meta.env.VITE_PROJECT_ID;
const storageBucket = import.meta.env.VITE_STORAGE_BUCKET;
const messaging = import.meta.env.VITE_MESSAGING_SENDER_ID;
const appId = import.meta.env.VITE_APP_ID;

const firebaseConfig = {
  apiKey: api,
  authDomain: authDomain,
  projectId: project,
  storageBucket: storageBucket,
  messagingSenderId: messaging,
  appId: appId,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

//funciones

export async function userExits(uid) {
  const docRef = doc(db, "users", uid);
  const res = await getDoc(docRef);
  //   console.log(res);
  return res.exists();
}

export async function existsUsername(username) {
  const users = [];
  const docsRef = collection(db, "users");
  const q = query(docsRef, where("username", "==", username));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => users.push(doc.data()));
  return users.length > 0 ? users[0].uid : null;
}

export async function registererNewUser(user) {
  try {
    const collectionRef = collection(db, "users");
    const docRef = doc(collectionRef, user.uid);
    await setDoc(docRef, user);
  } catch (error) {
    console.log(error);
  }
}

export async function updateUser(user) {
  try {
    const collectionRef = collection(db, "users");
    const docRef = doc(collectionRef, user.uid);
    await setDoc(docRef, user);
  } catch (error) {
    console.log(error);
  }
}

export async function getUserInfo(uid) {
  try {
    const docRef = doc(db, "users", uid);
    const document = await getDoc(docRef);
    return document.data();
  } catch (error) {
    console.log(error);
  }
}

export async function insertNewLink(link) {
  try {
    const docRef = collection(db, "links");
    const res = await addDoc(docRef, link);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function getLinks(uid) {
  const links = [];
  try {
    const collectionRef = collection(db, "links");
    const q = query(collectionRef, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const link = { ...doc.data() };
      link.docId = doc.id;
      links.push(link);
    });
    return links;
  } catch (error) {
    console.log(error);
  }
}

export async function updateLink(docId, link) {
  try {
    const docRef = doc(db, "links", docId);
    const res = await setDoc(docRef, link); //esta funcion no retorna nada res === undefined
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteLink(docId) {
  try {
    const docRef = doc(db, "links", docId);
    await deleteDoc(docRef);
  } catch (error) {
    console.log(error);
  }
}

export async function setUserProfilePhoto(uid, file) {
  //   console.log(uid, file);
  try {
    const imageRef = ref(storage, `image/${uid}`);
    const resUpload = await uploadBytes(imageRef, file);
    return resUpload;
  } catch (error) {
    console.log(error);
  }
}

export async function getProfilePhotoUrl(profilePicture) {
  try {
    const imagesRef = ref(storage, profilePicture);
    const url = await getDownloadURL(imagesRef);
    return url;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserPublicProfileInfo(uid) {
  const profileInfo = await getUserInfo(uid);
  const linksInfo = await getLinks(uid);
  return {
    profileInfo: profileInfo,
    linksInfo: linksInfo,
  };
}

export async function getSignOut() {
  try {
    signOut(auth);
  } catch (error) {
    console.log(error);
  }
}
