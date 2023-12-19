/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import SearchBar from "./search-bar";
import { CommonAssets } from "@/constants/assets.constant";
import { NavRoutes } from "@/config/header.config";
import Link from "next/link";
import ShoppingCart from "./shopping-cart";

const Header = () => {
  const [showComponent, setShowComponent] = useState(false);
  const [showCart, setShowCart] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Check if the scroll position is greater than 60px
      setShowComponent(scrollY > 60);
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); 

  return (
    <section className="bg-white relative border-b w-full ">
      
      <div className={`fixed z-50 right-0 transition-all duration-300 ease-in-out ${showCart?"translate-x-0":"translate-x-full"}`}>
        <ShoppingCart setshowCart={setShowCart}/>
      </div>
      {/* top section  */}
      <div className="flex pt-4 pb-4 container2 md:px-[72px] justify-between ">
        {/* logo  */}
        <div className="w-52 h-12 overflow-hidden flex items-center">
          <img
            alt="inkredibles logo"
            className="invert"
            src={CommonAssets.Logo}
          />
        </div>
        {/* search bar  */}
        <SearchBar />
        <div className="flex items-center gap-4">
          <Link href={"/login"}>Login / Register</Link>
          <div onClick={()=>setShowCart(!showCart)} className="flex rounded-full border cursor-pointer py-3 gap-2 px-5">
            <img
              alt="shopping cart"
              src={CommonAssets.ShoppingCart}
              className="opacity-50 w-4"
            />
            <small> 2 items</small>
          </div>
        </div>
      </div>
      {/* navbar */}
      <div
        className={`w-full bg-white bg-opacity-90 top-0 z-40 ${
          showComponent && "fixed"
        }`}
      >
        <div className="flex container2 md:px-[72px] py-4 justify-between">
          <div className="flex gap-12">
            {NavRoutes.map((route) => {
              return (
                <small
                  className="flex items-center [&>*]:hover:text-orange-600 gap-2"
                  key={route.label}
                >
                  <Link href={route.path}>{route.label}</Link>
                  {route?.subroutes && (
                    <img
                      src={CommonAssets.DropDown}
                      alt="dropdown"
                      className="w-4"
                    />
                  )}
                </small>
              );
            })}
          </div>
          <p>Call Free Support: 0123456789</p>
        </div>
      </div>
    </section>
  );
};

export default Header;
