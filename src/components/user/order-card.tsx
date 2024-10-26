/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { TCartItem } from '@/lib/types';

const OrderCard = ({ product }: { product: TCartItem }) => {
    console.log('product', product);
    return (
        <div className='flex justify-between items-center w-full bg-white rounded drop-shadow border px-10 py-6'>
            <div className='flex gap-4'>
                <img className='w-16 h-auto' src={product.image} alt={product.productId} />
                <div><h4>{product.productId}</h4>
                    <ul className='flex gap-4'>
                        <li>Color: {product.color}</li>
                        <li>Size: {product.size}</li>
                        {product.quantity > 1 ? <li>Quantity: {product.quantity}</li> : null}
                    </ul>
                </div>
            </div>
            <h4>₹{product.price}</h4>
          
        </div>
    );
};

export default OrderCard;