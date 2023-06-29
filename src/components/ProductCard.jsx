import React from "react";

export default function ProductCard({ product }) {
  return (
    <li>
      <img src={product.image} alt={product.title} />
      <div>
        <h3>{product.title}.title</h3>
        <p>{product.price}</p>
      </div>
      <p>{product.category}</p>
    </li>
  );
}
