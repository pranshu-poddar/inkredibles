/* eslint-disable @next/next/no-img-element */
import { ProductType, WomenCollection } from "@/__mocks__/product.mock";
import React from "react";
import ProductCard from "./product-card";
import { HomeAssets } from "@/constants/assets.constant";

type ProductSectionProps = {
  isReversed?: boolean;
  Products: ProductType[];
  title: string;
  banner: string;
};

const ProductSection = ({
  isReversed,
  Products,
  title,
  banner,
}: ProductSectionProps) => {
  return (
    <section>
      <div className="max-w-screen-xl px-4 py-8 sm:px-6 mx-auto sm:py-12 lg:px-8 lg:py-16">
        <div
          className={`grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center lg:gap-x-8 `}
        >
          <div
            className={`mx-auto max-w-2xl text-center lg:mx-0 ltr:lg:text-left rtl:lg:text-right ${
              isReversed ? "order-last" : ""
            }`}
          >
            <img src={banner} alt="women jacket" />
          </div>

          <div>
            <div className="text-center">
              <h2>{title}</h2>
              <p>
                Contemporary, minimal and modern designs embody the Lavish Alice
                handwriting
              </p>
              <ul className="flex mx-auto w-fit space-x-4 my-8">
                <li>Clothing</li>
                <li>Handbag</li>
                <li>Shoes</li>
                <li>Accessories</li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {Products.map((product) => {
                return (
                  <div key={product.label}>
                    <ProductCard {...product} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
