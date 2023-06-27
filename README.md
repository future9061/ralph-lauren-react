![ralphlouren](https://github.com/future9061/ralph-lauren-react/assets/132829711/3ff13a2a-f25a-439c-81ba-ff3124bef497)
<br>


# react-Project-ralph-rouren
<br>


## 🖥️ 프로젝트 소개
ralph-rouren 사이트를 클론 하여 route, firebase를 이용한 DB관리를 해봤습니다
<br>

## 🕰️ 개발 기간
* 23.06.26일 - 미정
<br>


## ⚙️ 개발 환경
- `vs code 1.77`
- **Framework** : react(18.2.0)
- **Database** : firebase(9.23.0)
- **library** : react-router-dom(6.14.0)
<br>


## 📌 주요 기능
#### 로그인 
- firebase google을 이용한 로그인 기능<br />
  firebase 인증 기능을 이용해서 log In 버튼을 누르면 구글 팝업창이 뜨게 함


#### 관리자 페이지 
- new product에 접근하여 새 상품을 올릴 수 있음

<br>


## 🎇Upgrade

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
//firebase real DB에 운영자로 권한 줄 계정의 uid를 object 형태로 저장해놓음

```

## 느낀점 📢
