import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../components/ui/Button";
import { useAuthContext } from "../components/context/AuthContext";
import { addOrUpdateToCart } from "../api/firebase";

export default function ProductDetail() {
  //안에 함수 들어있어서 객체 리터럴 형태로 가져옴
  const { uid } = useAuthContext();

  const {
    state: {
      product: { id, category, description, image, title, price, options },
    },
  } = useLocation();

  //user가 option 선택 안하면 무조건 첫번째 옵션
  const [selected, setSelected] = useState(options && options[0]);

  //select 이벤트
  const handSelect = (e) => {
    setSelected(e.tatget.value);
    console.log("select에서 발생하는 이벤트", e.tatget.value);
  };

  //장바구니에 추가 버튼 누르면 이벤트
  //e.target이 생략된 이유
  //e.target은 주로 이벤트가 발생한 요소의 정보를 얻거나 조작할 때 사용되는데 해당 함수는 addOrUpdateToCart에 인자를
  //넘겨주는 용도로만 사용되기 때문
  const handClick = (e) => {
    const product = { id, title, image, options: selected, price, quantity: 1 };
    addOrUpdateToCart(uid, product);
  };

  return (
    <div className="w-full max-w-screen-xl m-auto py-24 md:py-40">
      <section className="flex flex-col md:flex-row">
        <img src={image} alt={title} />
        <div className="">
          <p>여성의류 / {category}</p>
          <h2>{title}</h2>
          <p>{`₩${price}`}</p>
          <p>{description}</p>
          <div>
            <label htmlFor="select">옵션</label>
            <select name="" id="select" onChange={handSelect} value={selected}>
              {options &&
                options.map((option, index) => (
                  <option key={index}>{option}</option>
                ))}
            </select>
          </div>
          <Button onClick={handClick} text="장바구니에 추가" />
        </div>
      </section>
    </div>
  );
}
