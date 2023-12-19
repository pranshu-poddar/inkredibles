import React from 'react';
import CartItem from '../shared/cart-item';
import OrderSummary from './order-summary';

type CartSectionProps = {
    setstep: React.Dispatch<React.SetStateAction<number>>
}

const CartSection = ({ setstep }: CartSectionProps) => {
    return (
        <div className='flex gap-8 max-md:flex-col relative '>
            <div className="flex flex-1 h-fit sticky top-0 flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 drop-shadow-sm space-y-6">
                <h3 className="text-3xl  font-semibold leading-5 text-inkredible-black">Cart</h3>
                <ul className="flex w-full space-y-4 flex-col border-gray-200 divide-y pb-4">
                    <CartItem />
                    <CartItem />
                    <CartItem />
                </ul>
            </div>
            <div className='flex-1 space-y-4'>
                <OrderSummary />
                <div className="w-full flex justify-center items-center">
                    <button onClick={()=>setstep(2)} className="hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">Continue</button>
                </div>
            </div>
        </div>
    );
};

export default CartSection;