/* eslint-disable @next/next/no-img-element */
'use client'
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { orderMock } from '@/components/user/mock/order.mock';

const Page = () => {
    const query = useSearchParams();
    const orderID = query.get('orderID') || ""
    const order = orderMock[0]
    return (
        <div className='space-y-4 w-full'>
            <div className='space-y-4 w-full bg-white rounded drop-shadow border px-10 py-6'>
                <h4>Delivery Address</h4>
                <p className='text-inkredible-black font-bold'>{order.address.name}</p>
                <p>{order.address.street} {order.address.city} {order.address.pin}</p>
                <div>
                    <p>Mobile: <span className='font-semibold text-inkredible-black'>{order.address.phone}</span></p>
                    <p>Email: <span className='font-semibold text-inkredible-black'>{order.address.email}</span></p>
                </div>
            </div>

            <div className='flex justify-between gap-4 items-center w-full bg-white rounded drop-shadow border px-10 py-6'>
                <div className='flex gap-4'>
                    <img className='w-16 h-auto' src={order.img} alt={order.name} />
                    <div>
                        <h4>{order.name}</h4>
                        <ul className='flex gap-4'>
                            <li>Color: {order.color}</li>
                            <li>Size: {order.size}</li>
                            {order.quantity > "1" ? <li>Quantity: {order.quantity}</li> : null}
                        </ul>
                        <h4>₹{order.price}</h4>
                    </div>
                </div>
                <div>{order.status}</div>
            </div>
        </div>
    );
};

export default Page;