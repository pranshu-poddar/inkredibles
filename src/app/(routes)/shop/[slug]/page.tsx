'use client'
/* eslint-disable @next/next/no-img-element */
import { InstaPics } from '@/__mocks__/instagram.mocks';
import { MenCollections, Sizes} from '@/__mocks__/product.mock';
import SliderContainer from '@/components/shared/slider';
import RelatedProducts from '@/components/shop/related-products';
import Tabs from '@/components/shop/tabs';
import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Product = ({params}:{params:{slug:string}}) => {
  const product = MenCollections.find((p) => p.label === decodeURIComponent(params.slug));
  const [quantity, setquantity] = useState(1)
  const [isLiked, setisLiked] = useState(false)
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container2 px-5 pt-24 mx-auto">
        <div className="px-10 mx-auto flex flex-wrap">

          {/* left section  */}
          <div className="md:w-[35%] w-full md:h-auto ">
            <div className='relative w-full h-[80dvh] md:h-[80%]'>
              <img alt="ecommerce" className='object-cover absolute inset-0 h-full w-full' src={product?.img} />
            </div>
            <SliderContainer SlidesToShow={4}>
              {InstaPics.map((pic) => {
                return (
                  <div
                    className="h-[7rem] scale-90 overflow-hidden relative"
                    key={pic}
                  >
                    <img
                      className="absolute inset-0 object-cover"
                      src={pic}
                      alt="insta pic"
                    />
                  </div>
                );
              })}
            </SliderContainer>
          </div>
          {/* right section  */}
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h1 className="text-3xl title-font font-medium mb-1">{product?.label}</h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-orange-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-orange-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-orange-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-orange-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-orange-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <span className="text-gray-600 ml-3">4 Reviews</span>
              </span>

            </div>
            {product?.discount?<p className="tracking-wide text-xl font-medium "><span className="line-through decoration-red-500 decoration-2 mr-2">${product.price}</span> ${(100-product.discount)/100*product.price}</p> :<p className="tracking-wide text-xl font-medium">${product?.price}</p>}
            <p className="leading-relaxed mt-6">Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex">
                <span className="mr-3">Color</span>
                <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                <button className="border-2 border-gray-300 ml-1 bg-orange-500 rounded-full w-6 h-6 focus:outline-none"></button>
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                  <select defaultValue={"L"} className="rounded border appearance-none border-gray-300 py-2 outline-none cursor-pointer pl-3 pr-10">
                    {Sizes.map((size)=>{
                      return <option key={size} value={size}>{size}</option>
                    })}
                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4" viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className='flex items-center gap-4'>
                <label htmlFor='quantity'>Quantity</label>
                <input name='quantity' onChange={(e) => setquantity(parseInt(e.target.value))} value={quantity} type='number' className="flex-1 w-24 appearance-no  ne outline-none border border-gray-200 rounded py-2 px-4 " />
                <button className="flex text-white bg-inkredible-black hover:bg-orange-500 transition-all duration-150 ease-out py-3 px-6 items-center rounded">ADD TO CART</button>
              </div>
            </div>
            <button onClick={() => setisLiked(prev => !prev)} className='flex text-base group items-center mt-8'>{isLiked ? <FaHeart className="w-5 fill-red-500 h-auto" /> : <FaRegHeart className="w-5 group-hover:fill-red-500 transition-all duration-150 ease-out h-auto" />}  Add To Wish List</button>
          </div>

        </div>

        <Tabs />
        <RelatedProducts Products={MenCollections} title="Related Products" />
        {/* <RelatedProducts Products={WomenCollection} title="Upsell Products" /> */}

      </div>
    </section>
  );
};

export default Product;