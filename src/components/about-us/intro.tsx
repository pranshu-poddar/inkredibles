/* eslint-disable @next/next/no-img-element */
import { AboutUsAssets } from "@/constants/assets.constant";
import React from "react";

const Intro = () => {
  return (
    <section className="container2">
      <div className="px-10 flex py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-3xl text-2xl mb-4 font-medium ">
            Welcome to Inkredibles
          </h1>
          <h4 className="mb-4 font- text-[15px] text-orange-500 font-semibold leading-relaxed">
            We at Inkredibles take pride in our designs and this is only because you have shown the trust in us.
          </h4>
          <p className="mb-4 text-[15px] leading-relaxed">

            Inkredibles as the name suggests is exactly what we strive for; to be Inkredibles at whatever we do and it starts with a small step in quirky designs hoping it grows each time you visit us.

            Inkredibles – Seeing things from a different perspective
          </p>
          <p className="mb-4 text-[15px] leading-relaxed">

            Starting something new with jitters in your stomach always lands you at your dream destination. This jittery feeling got us an opportunity to meet you! And look here we are trying to make you look completely modern, trendy and stylish with a SWAG using our designs and patters carved just for you.
            Why we stand out from the crowd – Our designs are our strength and you boost our confidence with your love and affection as always.
          </p>

          <div className="flex justify-center">
            <button className="inline-flex border py-2 px-6 focus:outline-none hover:bg-orange-600 hover:text-white border-inkredible-black text-inkredible-black hover:border-orange-600 ">
              VIEW WORK
            </button>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img
            className="object-cover object-center rounded"
            alt="hero"
            src={AboutUsAssets.AboutUsBanner}
          />
        </div>
      </div>
    </section>
  );
};

export default Intro;
