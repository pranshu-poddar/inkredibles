/* eslint-disable @next/next/no-img-element */
import { AboutUsAssets } from '@/constants/assets.constant';
import React from 'react';

const Intro = () => {
  return (
    <section className="container2">
    <div className="px-10 flex py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-3xl text-2xl mb-4 font-medium ">Welcome to Inkredibles
            </h1>
            <p className="mb-8 text-[15px] leading-relaxed">Quibusdam perspiciatis pariatur magnam ducimus excepturi error libero provident animi laboriosam maiores ad explicabo ea laudantium nostrum dolor distinctio, quas fugiat doloribus, sit, possimus obcaecati ab quo vel commodi eum. Laudantium libero, voluptate rerum sunt hic,</p>
            <p className="mb-8 text-[15px] leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse numquam blanditiis quos, fuga, aspernatur doloribus expedita, soluta dolore cumque.</p>
            <div className="flex justify-center">
                <button className="inline-flex border py-2 px-6 focus:outline-none hover:bg-orange-600 hover:text-white border-inkredible-black text-inkredible-black hover:border-orange-600 ">VIEW WORK</button>

            </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img className="object-cover object-center rounded" alt="hero" src={AboutUsAssets.AboutUsBanner} />
        </div>
    </div>
</section>
  );
};

export default Intro;