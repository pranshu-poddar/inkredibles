/* eslint-disable @next/next/no-img-element */
"use client";
import React, { RefObject } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CarouselItems } from "@/__mocks__/carousel.mock";
import Image from "next/image";
import Link from "next/link";
import { CommonAssets } from "@/constants/assets.constant";

const MainCarousel = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    appendDots: (
      dots:
        | string
        | number
        | boolean
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | Iterable<React.ReactNode>
        | React.ReactPortal
        | React.PromiseLikeOfReactNode
        | null
        | undefined,
    ) => (
      <div>
        <ul className="absolute bottom-10  flex gap-6 justify-center w-full ">
          {" "}
          {dots}{" "}
        </ul>
      </div>
    ),
    customPaging: (i: number) => (
      <div className="w-10 h-1 bg-white hover:bg-orange-500 transition-all duration-300 ease-out"></div>
    ),
  };
  const sliderRef: RefObject<Slider> = React.createRef();
  return (
    <div className="relative group">
      <img
        className="w-[3rem] max-sm:hidden absolute top-1/2 z-10 left-[2rem] opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out translate-x-full group-hover:translate-x-0 cursor-pointer"
        onClick={() => sliderRef?.current?.slickPrev()}
        src={CommonAssets.LeftArrow}
        alt="previous arrow"
      />
      <Slider ref={sliderRef} {...settings}>
        {CarouselItems.map((item) => {
          return (
            <div
              key={item.id}
              style={{ backgroundImage: `url(${item.bgImg})` }}
              className="flex h-[95vmin] w-full relative text-white justify-center items-center lg:p-20 p-[5vw]"
            >
              <Image
                src={item.bgImg}
                alt="banner image"
                className="absolute inset-0 w-full"
                fill
              />
              <div className="absolute z-10 max-sm:text-center flex flex-col md:gap-8 sm:gap-4 items-center h-fit">
                <Image
                  src={item.titleImg}
                  alt="new scheme"
                  className="lg:scale-100 md:scale-90 sm:scale-75 scale-50"
                  height={400}
                  width={400}
                />
                <h6 className="sm:text-sm text-xs">{item.des}</h6>
                <Link
                  className="underline text-white underline-offset-8"
                  href={item.link}
                >
                  Discover Now
                </Link>
              </div>
            </div>
          );
        })}
      </Slider>
      <img
        className="w-[3rem] max-sm:hidden absolute top-1/2 z-10 right-[2rem] opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out -translate-x-full group-hover:translate-x-0 cursor-pointer"
        onClick={() => sliderRef?.current?.slickNext()}
        src={CommonAssets.RightArrow}
        alt="next arrow"
      />
    </div>
  );
};

export default MainCarousel;
