![캡처](https://github.com/future9061/ralph-lauren-react/assets/132829711/edddebdf-e560-46b9-ac2c-9d4f399a8ba5)
<br>


### react-Project-ralph-rouren
<br>


## 🖥️ 프로젝트 소개
firebase를 이용한 DB관리,react로 ralph-rouren 사이트를 클론 하여 디자인 해서 쇼핑몰을 만들어봤습니다 
<br>

## 🕰️ 개발 기간
* 23.06.26일 - 23.07.05
<br>


## ⚙️ 개발 환경
- `vs code 1.77`
- **Framework** : react(18.2.0)
- **Database** : firebase(9.23.0)
- **library** : react-router-dom(6.14.0), react-query(3.39.3)
<br>


## 📌 주요 기능
#### 로그인 
- firebase google을 이용한 로그인 기능<br />
  firebase 인증 기능을 이용해서 log In 버튼을 누르면 구글 팝업창이 뜨게 함


#### 관리자 페이지 
- firebase로 관리자 uid 지정하여 관리자만 new product에 접근하여 새 상품을 올릴 수 있음, 일반 유저 new product에 접근 못하게 protected component 만들어서 <NewProduct /> 보호

#### 장바구니 
- 상품 디테일 페이지에서 장바구니에 추가 버튼을 누르면 firebase에 해당 유저 uid와 상품 uid가 firebase에 set 됨
- +와 - 버튼으로 상품 개수 조절 가능
- X누르면 firebase에서 상품 빠짐
- 금액 총 합 기능 ca

#### banner에 이미지 슬라이드 
- react-slick을 이용





<br>


## 🎇code review

- 로그인 한 후 새로고침 하면 화면상에서 log out으로 되는 문제를 useEffect로 처리!(로그인 상태에서 component가 mount 될 때 setUser)
  
```ruby
//firebase.js

//auth (인증 상태 변경을 감지하는 함수)
export async function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    //사용자가 로그인 한 경우
    const updateUser = user ? await adminUser(user) : null;
  //사용자가 로그인한 경우, adminUser 함수를 사용하여 user 정보를 updateUser 변수에 저장
    callback(updateUser);
  });
}

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



//NavBar.js
  const [user, setUser] = useState();

  useEffect(() => { 
    onUserStateChange((user) => {
      setUser(user); //새로고침해서 
      console.log("user", user); 
    });
  }, []);


```
<br>


- 사용자랑 운영자랑 권한을 다르게 줘 신제품 입력 페이지에 운영자만 접근할 수 있도록 함.

```ruby
//firebase real Database에 관리자로 권한 줄 계정의 uid를 object 형태로 저장해놓았기 때문에 db 연결해서 로그인한 계정의 uid와 user에 저장된 uid를 비교해야 함
 
import { getDatabase } from "firebase/database";

const app = initializeApp(firebaseConfig); //초기화 코드

const database = getDatabase(app);


//ref는 database 참조를 생성, 'admins'는 경로(key값)
//snapshot은 객체의 데이터 값을 반환하는 메서드, 반환된 값은 JavaScript 객체 형식으로 제공
//exists 데이터가 존재하는지 여부를 나타내는 불리언 값을 반환


async function adminUser(user) {
  return get(ref(database, "admins")).then((snapshot) => {
    if (snapshot.exists()) {
      const admins = snapshot.val();
      const isAdmin = admins.includes(user.uid);
      return { ...user, isAdmin }; 
    }
  });
}

//firebase에서 현재 인증자를 관찰하는 내장 객체 onAuthStateChanged
export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
}

```

-useQuery로 데이터를 가져오고 보냄.

```ruby

```


## 🔧upgrade 예정

- detail page에서 장바구니 추가 버튼 두 번 누르거나, 옵션 다르게 한 후 추가하면 장바구니에 추가되지 않음. project의 uid가 같으면 더 이상 추가되지 않는 것 같다. 상품 개수는 오로지 cart 페이지의 + - 버튼으로만 조절 가능한 상태

-favicon 넣기 







## 느낀점 📢
