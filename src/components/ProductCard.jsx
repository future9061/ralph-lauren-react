import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({
  product: { id, image, title, price, category },
  product,
}) {
  //useNavigate는 주소 이동의 기능도 있지만 데이터를 넘겨주는 것도 가능
  const navigate = useNavigate();

  return (
    <li
      onClick={() => {
        navigate(`/products/${id}`, { state: { product } });
      }}
      //뭘 넘겨주는거임 key는 state 상태를 넘겨줌
      //detail 한테 product data를 넘겨주는 것 객체니까 {}

      className="rounded-sm hover:shadow-xl hover:scale-105 cursor-pointer transition-all duration-300 pb-6"
    >
      <img className="w-full" src={image} alt={title} />
      <div className="flex justify-between items-center mt-6 mb-2 px-2">
        <h3 className="truncate">{title}</h3>
        <p className=" text-red-700 text-sm">{`₩${price}`}</p>
      </div>
      <p className="text-sm text-slate-400 pl-2">{category}</p>
    </li>
  );
}
