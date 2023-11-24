'use client'
import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CarouselItems } from '@/__mocks__/carousel.mock';
import Image from 'next/image';
import Link from 'next/link';

const MainCarousel = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        appendDots: (dots: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined) => (
            <div>
                <ul className='absolute bottom-10  flex gap-6 justify-center w-full '> {dots} </ul>
            </div>
        ),
        customPaging: (i: number) => (
            <div className='w-10 h-1 bg-white hover:bg-orange-500 transition-all duration-300 ease-out'></div>
        )
    };
    return (
        <div >
            <Slider {...settings}>
                {
                    CarouselItems.map((item) => {
                        return <div key={item.id} style={{ backgroundImage: `url(${item.bgImg})` }} className='flex h-[95vmin] w-full relative text-white justify-center items-center p-20'>
                            <Image src={item.bgImg} alt='banner image' className='absolute inset-0' fill={true} />
                            <div className='absolute z-10 flex flex-col gap-8 items-center h-fit'>
                                <Image src={item.titleImg} alt="new scheme" height={400} width={400} />
                                <h6>{item.des}</h6>
                                <Link className='underline text-white underline-offset-8' href={item.link}>Discover Now</Link>
                            </div>
                        </div>
                    })
                }
            </Slider>
        </div>
    )
}

export default MainCarousel

