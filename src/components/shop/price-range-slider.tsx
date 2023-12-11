'use client';
import React, { ChangeEvent } from 'react';

type PriceRangeSliderProps = {
    min:number;
    max:number;
    priceRange: number;
    setPriceRange: React.Dispatch<React.SetStateAction<number>>;
}

const PriceRangeSlider = ({ priceRange, setPriceRange,min,max }: PriceRangeSliderProps) => {

    return (
        <div className="relative mb-8 space-y-4">
            <h4>Filter By Price</h4>
            <input id="labels-range-input" type="range" step={50} value={priceRange} onChange={(e)=>{setPriceRange(parseInt(e.target.value))}} min={min} max={max} className="w-full h-1.5 bg-gray-300 rounded-lg  shadow-inner appearance-none cursor-pointer " />
            <span className="text-sm text-gray-500 dark:text-gray-400 float-left">Min (₹{min})</span>
            <span className="text-sm text-gray-500 dark:text-gray-400 float-right ">Max (₹{priceRange})</span>
            <button className='text-white rounded-full bg-inkredible-black hover:bg-orange-500 transition-all duration-150 ease-out px-6 py-2'>FILTER</button>
        </div>

    );
};

export default PriceRangeSlider;
