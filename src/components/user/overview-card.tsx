/* eslint-disable @next/next/no-img-element */
import React from 'react';

type OverviewDetailsProps = {
    icon: string,
    label: string,
    des: string,
}

const OverviewCard = ({overviewDetails}: {overviewDetails:OverviewDetailsProps}) => {
    return (
        <div className='flex flex-col text-center p-4 justify-center items-center border hover:bg-gray-100 transition-all duration-300 ease-out h-[16rem]'>
            <img src={overviewDetails.icon} alt="" className='mb-4 w-10 h-auto' />
            <h4 className='font-semibold text-base text-inkredible-black'>{overviewDetails.label}</h4>
            <p className='text-xs'>{overviewDetails.des}</p>
        </div>
    );
};

export default OverviewCard;