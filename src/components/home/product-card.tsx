/* eslint-disable @next/next/no-img-element */
import { ProductType } from "@/__mocks__/product.mock";
import { Pages } from "@/constants/page.constant";
import React from "react";

const ProductCard = (product: ProductType) => {
  return (
    <a href={Pages.Shop+"/"+encodeURI(product.label)} className="group block overflow-hidden">
      <div className="relative h-[13rem] w-full">
        <img
          src={product.img}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0"
        />

        <img
          src={product.img2}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
        />
      </div>

      <div className="relative bg-white pt-3">
        <h3 className="text-sm text-gray-700 group-hover:underline group-hover:underline-offset-4">
          {product.label}
        </h3>

        <div className="mt-1.5 flex items-center justify-between text-gray-900">
          {product.discount?<p className="tracking-wide"><span className="line-through decoration-red-500 decoration-2 mr-2">${product.price}</span> ${(100-product.discount)/100*product.price}</p> :<p className="tracking-wide">${product.price}</p>}

          <p className="text-xs uppercase tracking-wide">6 Colors</p>
        </div>
      </div>
    </a>
  );
};

export default ProductCard;
