/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { TOrder } from './mock/order.mock';
import Link from 'next/link';
import { Pages } from '@/constants/page.constant';

const OrderCard = ({ product }: { product: TOrder }) => {
    return (
        <Link href={Pages.OrderDetails+"?orderId="+product.id} className='flex justify-between hover:shadow-md items-center w-full bg-white rounded drop-shadow border px-10 py-6'>
            <div className='flex gap-4'>
                <img className='w-16 h-auto' src={product.img} alt={product.name} />
                <div><h4>{product.name}</h4>
                    <ul className='flex gap-4'>
                        <li>Color: {product.color}</li>
                        <li>Size: {product.size}</li>
                        {product.quantity > "1" ? <li>Quantity: {product.quantity}</li> : null}
                    </ul>
                </div>
            </div>
            <h4>₹{product.price}</h4>
            <div>
                {product.status}
            </div>
        </Link>
    );
};

export default OrderCard;