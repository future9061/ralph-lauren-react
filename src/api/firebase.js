import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

export function logIn() {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log("user?", user);
      // 로그인하면 user 정보 보이게 Navbar에 보이게 if문 유저가 있으면 가져오고 아니면 말고
      return user;
    })
    .catch(console.error);
  //   .catch((error) => console.error(error)); 받아오는 인자랑 같으면 생략 가능
}

export function logOut() {
  return signOut(auth).then(() => null);
}
