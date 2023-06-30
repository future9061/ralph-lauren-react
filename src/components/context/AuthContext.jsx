import { createContext, useContext, useEffect, useState } from "react";
import { onUserStateChange, login, logout } from "../../api/firebase";

//context가 여러 레벨의 component에게 데이터를 줄 수 있게(전역)으로
//1. context 객체를 만듦
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
  //나는 로그인 말고 현재 로그인한 유저의 정보만 가져와서 관리자 uid랑 비교할거라
  //파라미터로 user만 넣으면 됨
  return (
    <AuthContext.Provider value={{ user, login: login, logout: logout }}>
      {children} {/* 여기에 context 구독할 컴포넌트 넣을거니까.. app.js*/}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
