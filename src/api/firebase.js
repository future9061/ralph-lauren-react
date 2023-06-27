import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, get, ref } from "firebase/database";

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

      // 로그인하면 user 정보 보이게 Navbar에 보이게 if문 유저가 있으면 가져오고 아니면 말고
      return user;
    })
    .catch(console.error);
  //   .catch((error) => console.error(error)); 받아오는 인자랑 같으면 생략 가능
}

export async function logOut() {
  return signOut(auth).then(() => null);
}

//auth 유저 유무 받아오는 파라미터
export async function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    //사용자가 로그인 한 경우
    const updateUser = user ? await adminUser(user) : null;

    callback(updateUser);
  });
}

const database = getDatabase(app);

//사용자가 addmin 권한이 있는지 확인
//-> isAdmin을 user안에 넣음 user 있으면 true 없으면 flase
//user를 가져와서(그럼 데이터를 읽어야하니가 공식문서 데이터에서 데이터 한번만 읽기)
async function adminUser(user) {
  console.log(user);
  return get(ref(database, "addmins")).then((snapshot) => {
    if (snapshot.exists()) {
      const addmin = snapshot.val();
      const isAdmin = addmin.includes(user.uid);
      return { ...user, isAdmin };
    }
  });
}

//사용자에게 알려줌
