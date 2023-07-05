import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { addOrUpdateToCart } from "../api/firebase";
import { useAuthContext } from "../components/context/AuthContext";
import Button from "../components/ui/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function ProductDetail() {
  //객체 리터럴 형태로 uid 가져옴
  const { uid } = useAuthContext();
  const {
    state: {
      product: { id, category, description, image, options, price, title },
    },
  } = useLocation();
  const [selected, setSelected] = useState(options && options[0]);
  const [success, setSuccess] = useState(); //성공표시

  //useQuery Mutation사용- 서버에 데이터 올라가는 딜레이 없애고 바로 변경
  const queryClient = useQueryClient();
  //const addOrUpdateItem = useMutation( 비동기 함수(product)=> addOrUpdateToCart(uid,product),
  const addOrUpdateItem = useMutation(
    (product) => addOrUpdateToCart(uid, product),

    {
      //성공했을 때
      onSuccess: () => queryClient.invalidateQueries(["carts", uid]),
      //carts키를 가진 쿼리를 무효화(+uid를 확인하고 바로 업데이트 해줘!)
    }
  );

  const handleSelect = (e) => {
    setSelected(e.target.value);
    console.log("select에서 발생하는 이벤트 e.target.value", e.target.value);
  };
  const handleClick = (e) => {
    //장바구니에 추가
    const product = { id, title, image, options: selected, price, quantity: 1 };

    //.mutate 인자를 넣을 수 있는 옵션
    // mutate함수
    // mutate(variables, {
    //   onError,
    //   onSettled,
    //   onSuccess, -> 이것만 사용한 것
    //  })
    addOrUpdateItem.mutate(product, {
      onSuccess: () => {
        // onSuccess는 요청이 성공되었을 때 실행되는 구간입니다.
        setSuccess("장바구니에 추가되었습니다");
        setTimeout(() => setSuccess(null), 500);
      },
    });
    //addOrUpdateToCart(uid,product)
  };

  return (
    <div className="w-full max-w-screen-xl m-auto py-24 md:py-40">
      <section className="flex flex-col gap-4 md:gap-12 md:flex-row p-4">
        <img className="w-full max-w-3xl basis-7/12 " src={image} alt={title} />
        <div className="w-full basis-5/12 flex flex-col p-8 md:p-0">
          <p className="text-slate-700">여성의류 / {category}</p>
          <h2 className="text-2xl font-bold py-6">{title}</h2>
          <p className="text-xl pt-4 pb-10 text-red-700 border-b border-gray-400">{`₩${price}`}</p>
          <p className="py-4 text-sm">{description}</p>
          <div className="flex items-center">
            <label className="text-brand" htmlFor="select">
              옵션
            </label>
            <select
              className="p-2 m-4 flex-1 border border-slate-300 outline-none"
              id="select"
              onChange={handleSelect}
              value={selected}
            >
              {options &&
                options.map((option, index) => (
                  <option key={index}>{option}</option>
                ))}
            </select>
          </div>
          {success && (
            <p className="text-center text-2xl pb-6"> ✅ {success}</p>
          )}
          <Button onClick={handleClick} text="장바구니에 추가" />
        </div>
      </section>
    </div>
  );
}
