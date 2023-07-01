import React from "react";
import { useAuthContext } from "./context/AuthContext";
import { Navigate } from "react-router-dom";

//children, requireAdmin 매개변수
//children : 컴포넌트 내부에 위치한 자식 컴포넌트
//requireAdmin :   매개변수, 관리자 권한이 필요한지를 나타내는 불리언 값
//컴포넌트를 사용하는 부분에 true나 false를  전달

//단순히 parameter라면 {} 감싸지 않고 ( children, requireAdmin ) 이렇게 써도 되지 않나?
//repuiredAdmin이 단순히 인자를 받는 파라미터의 역할이 아니라 boolean 값이 할당되는 객체 이기 때문에
//구조 분해 할당 방식으로 parameter를 넣은 것임,
//만약 단순히 인자를 받는 children만 있다면 중괄호 없어도 됨
//참고로 리액트에서 children props는  component  태그 사이에 위치한 내용을 나타냄
//children은 NewProduct component고, 조건이 참이면 home, else면 NewProduct component 반환
export default function ProtectedRoute({ children, requireAdmin }) {
  const { user } = useAuthContext(); //현재 사용자 정보를 가져옴
  //AuthContext에서 제공되는 상태와 함수들을 사용할 수 있게 해주는 훅
  //정보 중 user만 비구조분해할당으로 가져옴
  console.log("user????? ", user);
  //로그인 안한 상태 & 로그인 계정이 관리자가 아니면 홈으로 돌아가
  if (!user || (requireAdmin && !user.isAdmin)) {
    return <Navigate to="/" replace />;
    // replace - 히스토리에 넣지 않음(뒤로 가기 불가능)
  }

  return children;
}

/*
  로그인한 사용자가 있는지 확인? 
  그 사용자가 admin인지?
*/
