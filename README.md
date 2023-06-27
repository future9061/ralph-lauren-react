![ralphlouren](https://github.com/future9061/ralph-lauren-react/assets/132829711/3ff13a2a-f25a-439c-81ba-ff3124bef497)


# react-Project-ralph-rouren


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

- 로그인 한 후 새로고침 하면 화면상에서 log out으로 text가 바뀌는 문제를 useEffect로 컴포넌트가 마운트 될 때 실행되는 부작용을 처리
  
```ruby
//firebase.js
export async function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    //사용자가 로그인 한 경우
    const updateUser = user ? await adminUser(user) : null;

    callback(updateUser);
  });
}


//NavBar.js
  const [user, setUser] = useState();

  useEffect(() => {
    onUserStateChange((user) => {
      setUser(user);
      console.log("user", user);
    });
  }, []);


```
<br>

#### 느낀점 📢
