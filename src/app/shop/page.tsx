import { MenCollections } from "@/__mocks__/product.mock";
import Products from "@/components/shop/products";
import Sidebar from "@/components/shop/sidebar";
import React from "react";

const Shop = () => {
  return <div className="container2 pt-20">
    <div className="px-10 flex gap-8">
      <Sidebar />
      <Products ProductList={MenCollections}/>
    </div>
  </div>;
};

export default Shop;
