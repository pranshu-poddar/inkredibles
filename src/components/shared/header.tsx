import Image from 'next/image'
import React from 'react'
import SearchBar from './search-bar'
import { CommonAssets } from '@/constants/assets.constant'
import { NavRoutes } from '@/config/header.config'
import Link from 'next/link'

const Header = () => {
  return (
    <section className='bg-white relative border-b w-full container2'>
      {/* top section  */}
      <div className='flex pt-8 pb-4 md:px-10 justify-between '>
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
      <div className='w-full bg-white bg-opacity-90 z-50'>
      <div className='flex md:px-10 py-4 justify-between'>
        <div className='flex gap-12'>
          {
            NavRoutes.map((route)=>{
              return <small className='flex items-center gap-2' key={route.label}><Link href={route.path} >{route.label}</Link><Image src={CommonAssets.DropDown} alt='dropdown' width={10} height={10}/></small>
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