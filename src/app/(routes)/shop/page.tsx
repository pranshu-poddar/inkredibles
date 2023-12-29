import Products from "@/components/shop/products";
import Sidebar from "@/components/shop/sidebar";
import React from "react";

const Shop = () => {
  return <div className="container2 pt-20">
    <div className="px-10 flex gap-8 relative">
      <Sidebar />
      <Products/>
    </div>
  </div>;
};

export default Shop;
