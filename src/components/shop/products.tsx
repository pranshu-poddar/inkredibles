'use client';
import { ProductType } from '@/__mocks__/product.mock';
import React, { useState } from 'react';
import ProductCard from '../home/product-card';
import { TfiLayoutGrid3Alt, TfiLayoutGrid4Alt } from "react-icons/tfi";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

type ProductsProps = {
    ProductList: ProductType[],
}
const Products = ({ ProductList }: ProductsProps) => {
    const [gridCols, setgridCols] = useState(3);
    const [sortingOrder, setsortingOrder] = useState(1);
    return (
        <div className='w-[80%] '>
            <h2 className='font-bold -mt-2'>Shop</h2>
            <div className='flex px-4 py-2 border mt-4 mb-12 justify-between items-center w-full'>
                <div className='flex gap-4'>
                    <TfiLayoutGrid3Alt onClick={() => setgridCols(3)} className={`cursor-pointer transition-all duration-150 ease-out  ${gridCols == 3 ? "text-gray-800" : "text-gray-400"}`} />
                    <TfiLayoutGrid4Alt onClick={() => setgridCols(4)} className={`cursor-pointer transition-all duration-150 ease-out scale-110 ${gridCols == 4 ? "text-gray-800" : "text-gray-400"}`} />
                    <GiHamburgerMenu onClick={() => setgridCols(1)} className={`cursor-pointer transition-all duration-150 ease-out scale-125 ${gridCols == 1 ? "text-gray-800" : "text-gray-400"}`} />
                </div>
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="border rounded flex items-center gap-2 py-2 px-4 text-gray-500">Sort by popularity<RiArrowDropDownLine className="scale-150" /></div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded border mt-1 min-w-max">
                        <li className='bg-stone-100 text-white'><a>Sort by popularity</a></li>
                        <li><a>Sort by price: low to high</a></li>
                        <li><a>Sort by price: high to low</a></li>
                        <li><a>Sort by average rating</a></li>
                        <li><a>Sort by newness</a></li>
                    </ul>
                </div>
                <div className='text-sm text-gray-500'>Showing 1-9 of 26</div>
            </div>
            <div className={`grid gap-8 ${gridCols == 1 ? "grid-cols-1" : gridCols == 3 ? "grid-cols-3" : "grid-cols-4"}`}>
                {
                    ProductList.map((product) => {
                        return <ProductCard key={product.label} img={product.img} tag={product.tag} img2={product.img2} label={product.label} price={product.price} />
                    })}
            </div>
            <div className='w-full flex justify-center mt-12 border p-2'>
                <div className="flex gap-4 items-center font-medium text-gray-500">
                    <button className="rounded px-4 py-2 hover:bg-orange-500 transition-all duration-150 ease-out hover:text-white h-full bg-stone-100"><MdKeyboardDoubleArrowLeft /></button>
                    <button className="rounded px-4 py-2 hover:bg-orange-500 transition-all duration-150 ease-out hover:text-white h-full bg-stone-100">1</button>
                    <button className="rounded px-4 py-2 hover:bg-orange-500 transition-all duration-150 ease-out hover:text-white h-full bg-stone-100">2</button>
                    <button className="rounded px-4 py-2 hover:bg-orange-500 transition-all duration-150 ease-out hover:text-white h-full bg-stone-100 disabled">...</button>
                    <button className="rounded px-4 py-2 hover:bg-orange-500 transition-all duration-150 ease-out hover:text-white h-full bg-stone-100">99</button>
                    <button className="rounded px-4 py-2 hover:bg-orange-500 transition-all duration-150 ease-out hover:text-white h-full bg-stone-100">100</button>
                    <button className="rounded px-4 py-2 hover:bg-orange-500 transition-all duration-150 ease-out hover:text-white h-full bg-stone-100"><MdKeyboardDoubleArrowRight /></button>
                </div>
            </div>
        </div>
    );
};

export default Products;