/* eslint-disable @next/next/no-img-element */
import { InstaPics } from "@/__mocks__/instagram.mocks";
import React from "react";
import SliderContainer from "../shared/slider";

const InstagramSection = () => {
  return (
    <div className="container2 text-center ">
      <div className=" px-10 relative">
        <h2 className="font-semibold">Follow us On Instagram</h2>
        <p className="mt-2 mb-12">
          Contemporary, minimal and modern designs embody the Lavish Alice
          handwriting
        </p>
        <SliderContainer SlidesToShow={5}>
          {InstaPics.map((pic) => {
            return (
              <div
                className="h-[14rem] scale-90 overflow-hidden relative"
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
      <a href="/" className="pt-4 tracking-wider hover:text-orange-500">
        #Follow us on Instagram
      </a>
    </div>
  );
};

export default InstagramSection;
