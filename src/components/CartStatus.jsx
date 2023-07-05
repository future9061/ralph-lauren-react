import React from "react";
import { BsHandbag } from "react-icons/bs";
import { useAuthContext } from "./context/AuthContext";
import { getCart } from "../api/firebase";
import { useQuery } from "@tanstack/react-query";

//장바구니에 상품 추가되면 뜨게 하는
export default function CartStatus() {
  //context에 넣어서 써 cartStatus, mycart 두 군데에서 써야 함

  //useMutation 써야 해
  const { uid } = useAuthContext();
  const { data: products } = useQuery(["carts", uid], () => getCart(uid), {
    staleTime: 1000, //useQuery의 옵션으로 데이터를 가져올 때 캐시된 데이터의 유효기간 지정
    // 따라서 staleTime은 useMutation과 직접적인 연관은 없지만,
    //useMutation을 사용하여 데이터를 변경하는 작업을 수행할 때
    //캐시된 데이터를 사용하고자 할 때 유용할 수 있습니다.
    //예를 들어, useMutation을 통해 새로운 데이터를 생성하거나 업데이트한 후에는
    //useQuery를 사용하여 해당 데이터를 다시 가져올 수 있습니다.
    //그리고 staleTime을 설정하여 캐시된 데이터를 일정 시간 동안 사용할 수 있습니다.
    //결론 : productDetail에서 useMutation 으로 데이터 업데이트 했는데
    //useMutation으로 업데이트한 데이터를 useQuery로 가져오려고 할 때 staleTimed옵션을 쓴다!
  });

  return (
    <div className="relative">
      <BsHandbag className="text-xl" />
      {products && (
        <p className="absolute -top-1 -right-2 text-sm">{products.length}</p>
      )}
    </div>
  );
}
