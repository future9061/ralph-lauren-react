import React from "react";
import { getCart } from "../api/firebase";
import { useAuthContext } from "../components/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import CartItem from "../components/CartItem";

export default function MyCart() {
  const { uid } = useAuthContext();
  const { isLoading, data: products } = useQuery(["carts"], () => getCart(uid));

  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="w-full max-w-screen-xl m-auto py-24 md:py-40">
      <div>
        <h2 className="text-center text-2xl">내 장바구니</h2>
        <div>
          <ul>
            {products &&
              products.map((product) => (
                <CartItem key={product.id} product={product} uid={uid} />
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
