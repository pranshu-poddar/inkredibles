/* eslint-disable @next/next/no-img-element */
'use client'
import React, { ReactNode, RefObject } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CommonAssets } from '@/constants/assets.constant';

interface SliderContainerProps {
    children: ReactNode;
    SlidesToShow:number,
  }

const SliderContainer = ({children,SlidesToShow}:SliderContainerProps) => {
    const sliderRef: RefObject<Slider> = React.createRef();
    let settings = {
        infinite: true,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 3000,
        slidesToShow: SlidesToShow,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "0",
        initialSlide: 0,
        arrows: false,
        responsive: [
          {
            breakpoint: 770,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 430,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      };
    return (
      <div className="relative group">
        <img
          className="w-[2.5rem] absolute top-1/2 z-10 -left-[2rem] opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out translate-x-full group-hover:translate-x-0 cursor-pointer"
          onClick={() => sliderRef?.current?.slickPrev()}
          src={CommonAssets.LeftArrow}
          alt="previous arrow"
        />
        <Slider ref={sliderRef} {...settings} className="cursor-grab mt-[2rem]">
          {children}
        </Slider>
        <img
          className="w-[2.5rem] absolute top-1/2 z-10 -right-[2rem] opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out -translate-x-full group-hover:translate-x-0 cursor-pointer"
          onClick={() => sliderRef?.current?.slickNext()}
          src={CommonAssets.RightArrow}
          alt="next arrow"
        />
      </div>
    );
};

export default SliderContainer;