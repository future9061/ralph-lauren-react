import React from "react";
import { Link } from "react-router-dom";
import { HiPencilAlt } from "react-icons/hi";
import { logIn, logOut, onUserStateChange } from "../api/firebase";
import { useState } from "react";
import { useEffect } from "react";
import User from "./User";

export default function Navbar() {
  const [user, setUser] = useState();

  //화면이 마운트(리로드 될때) 로그인이 되어있는지 아닌지 상태를 알아보는 함수 호출
  useEffect(() => {
    onUserStateChange((user) => {
      setUser(user);
      console.log("user", user);
    });
  }, []);

  const handleLogin = () => {
    logIn().then(setUser);
  };

  const handleLogout = () => {
    logOut().then(setUser);
  };

  return (
    <div className="border-b border-slate-300">
      <div className="w-full max-w-screen-2xl m-auto">
        <header className="flex justify-between items-center p-5">
          <h1 className="text-xl md:text-3xl font-logoFont tracking-widest">
            RALPH<span className="pl-3 md:pl-6">LAUREN</span>
          </h1>

          <nav className="flex items-center gap-4">
            <Link to="/products">Product</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/products/new">
              <HiPencilAlt />
            </Link>
            {user && <User user={user} />}
            {!user && <button onClick={handleLogin}>login</button>}
            {user && <button onClick={handleLogout}>logout</button>}
          </nav>
        </header>
      </div>
    </div>
  );
}
