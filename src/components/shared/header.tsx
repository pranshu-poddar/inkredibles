/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect, useMemo } from "react";
import SearchBar from "./search-bar";
import { CommonAssets } from "@/constants/assets.constant";
import { NavRoutes } from "@/config/header.config";
import Link from "next/link";
import ShoppingCart from "./shopping-cart";
import Cookies from "js-cookie";
import { IoPersonOutline, IoHeartOutline, IoBagOutline } from "react-icons/io5";
import AccountCard from "./account-card";
import { usePathname } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAccountFromSessionId } from "@/actions/account/get-accounts";
import useStore from "@/lib/hooks/use-store";
import { useCartStore } from "@/store/cart-store";
import { Account } from "@/store/user-store";

const Header = () => {
  const pathName = usePathname();
  const [showComponent, setShowComponent] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [sessionToken, setsessionToken] = useState<string>()
  const [user, setuser] = useState<Account | null>(null);
  const [isFetched, setisFetched] = useState(false);
  // const sessionToken = Cookies.get("sessionToken") || ""
  const queryClient = useQueryClient();
  useEffect(() => {
    if (user===null) {
      const getUser = async () => {
        const data = await queryClient.fetchQuery({
          queryKey: ['user', sessionToken],
          queryFn: async () => {
            const response = await getAccountFromSessionId(sessionToken || '');
            return response;
          },
        })
        console.log('data', data);
        setuser(data);
      }
      getUser()
    }
  }, [queryClient, sessionToken, user])

  useEffect(() => {
    setisFetched(true);
  }, [])

  const cart = useStore(useCartStore, (state) => state.items);

  const accountData = { role: user?.user?.role || "", phone: user?.user?.phone || "", name: user?.user?.firstName || "" }

  Cookies.set('at', user?.id || "", {
    expires: 7, // Set an appropriate expiration time
    // secure: false, // Ensures the cookie is only sent over HTTPS
    // httpOnly: false, // Helps protect against XSS attacks
    sameSite: 'Strict', // Provides some protection against CSRF attacks
  })

  useEffect(() => {
    setShowCart(false);
    setShowAccount(false);
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Check if the scroll position is greater than 60px
      setShowComponent(scrollY > 60);
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);
    setsessionToken(Cookies.get('sessionToken'))
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathName]);

  return (
    <section onMouseLeave={() => setShowAccount(false)} className="bg-white relative border-b w-full ">

      <div className={`fixed z-50 right-0 transition-all duration-300 ease-in-out ${showCart ? "translate-x-0" : "translate-x-full"}`}>
        <ShoppingCart setshowCart={setShowCart} />
      </div>

      {/* top section  */}
      <div className="flex items-center pt-4 pb-4 container2 md:px-[72px] justify-between ">

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
        <p>Call Free Support: 0123456789</p>
      </div>

      {/* navbar */}
      <div
        className={`w-full bg-white shadow-sm bg-opacity-90 top-0 z-40 ${showComponent && "fixed"
          }`}
      >
        <div className="flex container2 md:px-[72px] py-4 justify-between">
          <div className="flex gap-12">
            {NavRoutes.map((route) => {
              return (
                <small
                  className={`flex items-center gap-2 transition-colors duration-300 ease-out border-orange-600 ${pathName == route.path ? "[&>*]:text-orange-600 font-semibold border-b-2" : "[&>*]:hover:text-orange-600 hover:border-b-2"}`}
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

          {/* right section  */}
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center ">
              <div onMouseEnter={() => setShowAccount(true)}>
                <IoPersonOutline className="w-5 mx-auto text-gray-600 h-auto" />
                <small className="text-xs font-semibold text-inkredible-black tracking-wide">Profile</small>
              </div>
              {!!isFetched && <AccountCard user={accountData} isOpen={showAccount} modal={setShowAccount} sessionToken={sessionToken} />}
            </div>
            <div className="cursor-pointer">
              <IoHeartOutline className="w-5 mx-auto text-gray-600 h-auto" />
              <small className="text-xs font-semibold text-inkredible-black tracking-wide">Wishlist</small>
            </div>
            <div onClick={() => setShowCart(!showCart)} className="cursor-pointer relative">
              <IoBagOutline className="w-5 mx-auto text-gray-600 h-auto" />
              <small className="text-xs font-semibold text-inkredible-black tracking-wide">Bag</small>
              <p className={`text-white absolute -right-3 -top-3 border rounded-full w-5 drop-shadow font-mono flex items-center justify-center bg-red-500 h-5 ${cart?.length === 0 && "hidden"}`}>{cart?.length}</p>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};

export default Header;
