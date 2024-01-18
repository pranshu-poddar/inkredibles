"use client";
import React, { useState } from "react";
import { Category } from "@/__mocks__/category.mock";
import { IoIosArrowUp } from "react-icons/io";

const SearchBar = () => {
  const [showCategories, setshowCategories] = useState(false);
  return (
    <div className=" bg-gray-100 h-12 relative rounded-full max-w-xl flex items-center w-full shadow-sm border border-gray-200">
      <small
        onClick={() => setshowCategories(!showCategories)}
        className="flex border-r cursor-pointer h-full px-4 items-center min-w-max gap-2"
      >
        All Categories<IoIosArrowUp className={showCategories ? "rotate-0 transition-all duration-150 ease-linear" : "rotate-180 transition-all duration-150 ease-linear"} />
      </small>
      {showCategories && (
        <ul className="absolute left-2 h-32 overflow-y-auto overflow-x-hidden w-max border rounded-md bg-white top-[110%] z-50">
          {Category.map((category) => {
            return (
              <li
                className="py-2 px-4 min-w-max hover:bg-gray-100"
                key={category}
                value={category}
              >
                {category}
              </li>
            );
          })}
        </ul>
      )}
      <div className="flex w-full bg-white px-4 rounded-r-full h-full justify-between ">
        <input
          type="search"
          name=""
          id=""
          placeholder="search entire store here..."
          x-model="q"
          className="w-full text-sm outline-none focus:outline-none bg-transparent"
        />
        <button className="outline-none focus:outline-none">
          <svg
            className=" w-5 text-gray-600 h-5 cursor-pointer"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
