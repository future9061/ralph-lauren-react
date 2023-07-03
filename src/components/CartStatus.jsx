import React from "react";
import { BsHandbag } from "react-icons/bs";
import { useAuthContext } from "./context/AuthContext";
import { getCart } from "../api/firebase";
import { useQuery } from "@tanstack/react-query";

//장바구니에 상품 추가되면 뜨게 하는
export default function CartStatus() {
  //context에 넣어서 써 cartStatus, mycart 두 군데에서 써야 함

  const { uid } = useAuthContext();
  const { data: products } = useQuery(["carts"], () => getCart(uid));
  console.log("");

  return (
    <div>
      <BsHandbag />
      {products && <p>{products.length}</p>}
    </div>
  );
}
