import { createContext, useContext, useEffect, useState } from "react";
import { onUserStateChange, login, logout } from "../../api/firebase";

//1. context 객체를 만듦
//context? 여러 레벨의 component에게 데이터를 줄 수 있게(전역)으로
const AuthContext = createContext(); //인증 정보를 다른 컴포넌트들과 공유 가능
//defaultValue : 매개변수, 트리 안에서 적절한 provider가 없으면 굳이 안써도 ok

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(); //로그인여부(로그인정보)

  //화면이 마운트(리로드 될때) 로그인이 되어있는 아닌지 상태를 알아보는 함수 호출
  useEffect(() => {
    onUserStateChange((user) => {
      setUser(user);
      console.log("user", user);
    });
  }, []);

  //2. context의 data를 보낼 컴포넌트들에게 context의 변화를 알림(value가 바뀌면 렌더링)
  //property: function 형식으로 가져옴
  //객체 리터럴에서 함수를 정의할 때는 { propertyName: function() { ... } }과 같은 형식으로 작성
  //왜 객체 리터럴로 함수를 가져와야 하지?: 비구조분해할당으로 함수를 가져올 때는 그렇게 해야하는 듯
  //destructuring Assignment
  return (
    <AuthContext.Provider value={{ user, login: login, logout: logout }}>
      {children} {/* 여기에 context 구독할 컴포넌트 넣을거니까.. app.js*/}
    </AuthContext.Provider>
  );
}

//useContext를 사용하여 AuthContext에서 제공되는 값을 가져옵니다.
export function useAuthContext() {
  return useContext(AuthContext);
}
