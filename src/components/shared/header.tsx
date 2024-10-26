"use client";
/* eslint-disable @next/next/no-img-element */
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
import { Pages } from "@/constants/page.constant";
import HamburgerButton from "./hamburger-button";

const Header = () => {
  const pathName = usePathname();
  const [showComponent, setShowComponent] = useState(false);
  const [sidenav, setsidenav] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [sessionToken, setsessionToken] = useState<string>()
  const [user, setuser] = useState<Account | null>(null);
  const [isFetched, setisFetched] = useState(false);
  const [bgColor, setBgColor] = useState<null | string>(null);
  // const sessionToken = Cookies.get("sessionToken") || ""
  const queryClient = useQueryClient();
  useEffect(() => {
    if (user === null) {
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
        Cookies.set('at', data?.id || '' ,{
          expires: 7,
          path: "/",
          sameSite: 'Strict',
        })
      }
      getUser()
    }
  }, [queryClient, sessionToken, user])

  useEffect(() => {
    setisFetched(true);
  }, [])

  const cart = useStore(useCartStore, (state) => state.items);

  const accountData = { role: user?.user?.role || "", phone: user?.user?.phone || "", name: user?.user?.firstName || "" }

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

  const handleToggleSidenav = () => {
    setsidenav(!sidenav);
    setBgColor("bg-gray-100");

    // Reset the background color after 500 milliseconds (half a second)
    setTimeout(() => {
      setBgColor(null);
    }, 300);
  };

  return (
    <section onMouseLeave={() => setShowAccount(false)} className="bg-white relative border-b w-full ">

      <div className={`fixed z-50 right-0 transition-all duration-300 ease-in-out ${showCart ? "translate-x-0" : "translate-x-full"}`}>
        <ShoppingCart setshowCart={setShowCart} />
      </div>

      {/* top section  */}
      <div className="flex max-sm:hidden items-center py-4 gap-2 container2 md:px-[72px] justify-between ">

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
        <p>Call Free Support: <Link href={"tel:919372677838"}>+91 9372677838</Link></p>
      </div>

      {/* navbar */}
      <div
        className={`w-full max-sm:hidden bg-white shadow-sm bg-opacity-90 top-0 z-40 ${showComponent && "fixed"
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

      {/* Responsive navbar  */}
      <div className={`flex z-40 w-full bg-white top-0 justify-between sm:hidden items-center px-4 ${showComponent && "fixed"}`}>
        <div className="flex relative items-center">
          <div
            onClick={handleToggleSidenav}
            className={`cursor-pointer  transition-all duration-300 ease-in-out p-4 flex justify-center items-center rounded-full sm:hidden ${bgColor}`}
          >
            <HamburgerButton isOpen={sidenav} />
          </div>
          {/* logo  */}
          <a href={Pages.Home} className="w-32 h-12 overflow-hidden flex items-center">
            <img
              alt="inkredibles logo"
              className="invert"
              src={CommonAssets.Logo}
            />
          </a>
        </div>
        <div className="flex items-center gap-4">
          <a href={Pages.Overview}>
            <IoPersonOutline className="w-5 mx-auto text-gray-600 h-auto" />
          </a>
          <a href={Pages.Checkout} className="cursor-pointer relative">
            <IoBagOutline className="w-5 mx-auto text-gray-600 h-auto" />
            <p className={`text-white absolute -right-3 -top-3 border rounded-full w-5 drop-shadow font-mono flex items-center justify-center bg-red-500 h-5 ${cart?.length === 0 && "hidden"}`}>{cart?.length}</p>
          </a>
        </div>
      </div>

      {/* side bar for smaller screens */}
      <div
        className={` [&>*]:cursor-pointer w-full  mt-[3rem] bg-white z-50 sm:hidden px-3 sm:px-6 py-8 sm:text-xl overflow-hidden ease-linear drop-shadow transition-all duration-300 fixed inset-0 ${sidenav ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {NavRoutes.map((route) => {
          return (
            <div key={`${route.label} link`} className="group relative">
              <div
                className={` py-3 px-2 flex justify-between items-center transition-all duration-200 ease-in-out text-base text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-800`}
              >
                {route.path.length != 0 ? (
                  <Link href={route.path}>{route.label}</Link>
                ) : (
                  <span>{route.label}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Header;
