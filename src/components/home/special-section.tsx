/* eslint-disable @next/next/no-img-element */
import { HomeAssets } from "@/constants/assets.constant";
import React from "react";

const SpecialSection = () => {
  return (
    <section className={`relative container2 overflow-hidden px-10 `}>
      <img
        src={HomeAssets.SpecialBanner}
        alt="product banner"
        className="absolute inset-0 object-contain"
      />

      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        <div className="max-w-xl">
          <h1>Game Of Thrones Jaime Lannister Themed Sneakers</h1>

          <div className="mt-20">
            <a href="#" className="underline underline-offset-8 sm:w-auto">
              <span className="text-base text-gray-800 font-medium">
                Discover Now
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialSection;
