'use client'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import SearchBar from './search-bar'
import { CommonAssets } from '@/constants/assets.constant'
import { NavRoutes } from '@/config/header.config'
import Link from 'next/link'

const Header = () => {
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Check if the scroll position is greater than 60px
      setShowComponent(scrollY > 60);
    };

    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array to ensure the effect runs only once

  return (
    <section className='bg-white relative border-b w-full '>
      {/* top section  */}
      <div className='flex pt-8 pb-4 container2 md:px-[72px] justify-between '>
        {/* logo  */}
        <Image alt='inkredibles logo' width={80} height={24} src={CommonAssets.Logo} />
        {/* search bar  */}
        <SearchBar />
        <div className='flex items-center gap-4'>
          <Link href={"/login"}>Login / Register</Link>
          <div className='flex rounded-full border py-3 gap-2 px-5'>
            <Image alt='shopping cart' src={CommonAssets.ShoppingCart} className='opacity-50' width={20} height={20} />
            <small> 2 items</small>
          </div>
        </div>
      </div>
      {/* navbar */}
      <div className={`w-full bg-white bg-opacity-90 top-0 z-50 ${showComponent && "fixed"}`}>
        <div className='flex container2 md:px-[72px] py-4 justify-between'>
          <div className='flex gap-12'>
            {
              NavRoutes.map((route) => {
                return <small className='flex items-center [&>*]:hover:text-orange-600 gap-2' key={route.label}><Link href={route.path} >{route.label}</Link>{route?.subroutes && <Image src={CommonAssets.DropDown} alt='dropdown' width={10} height={10} />}</small>
              })
            }
          </div>
          <p>Call Free Support: 0123456789</p>
        </div>
      </div>
    </section>
  )
}

export default Header