import React from "react";
import { useAuthContext } from "./context/AuthContext";
import { Navigate } from "react-router-dom";

//children, requireAdmin 매개변수
//children : 컴포넌트 내부에 위치한 자식 컴포넌트
//requireAdmin : 관리자 권한이 필요한지를 나타내는 불리언 값
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
