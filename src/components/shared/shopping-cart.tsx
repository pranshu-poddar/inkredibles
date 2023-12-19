/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { RxCross2 } from "react-icons/rx";
import CartItem from './cart-item';
import { Pages } from '@/constants/page.constant';
import { useRouter } from 'next/navigation';

type shoppingCartProps = {
    setshowCart: React.Dispatch<React.SetStateAction<boolean>>
}

const ShoppingCart = ({ setshowCart }: shoppingCartProps) => {
    const Router = useRouter();
    return (
        <div className="flex flex-col max-w-3xl drop-shadow bg-white h-screen p-6 relative space-y-4 sm:p-10 ">
            <h2 className="text-xl font-semibold">Your cart</h2>
            <RxCross2 className="absolute right-6 top-6 w-6 h-auto cursor-pointer" onClick={() => setshowCart(false)} />
            <ul className="flex flex-col divide-y overflow-y-auto pr-4 pb-24">
                <CartItem />
            </ul>
            <div className="space-y-1 absolute bg-white w-full bottom-0 sm:p-10 p-6 left-0 text-right">
                <p>Total amount:
                    <span className="font-semibold">357 €</span>
                </p>
                <p className="text-sm ">Not including taxes and shipping costs</p>
                <div className="flex justify-end space-x-4">
                    <button type="button" className="px-6 py-2 border rounded-md hover:drop-shadow bg-white">Back
                        <span className="sr-only sm:not-sr-only"> to shop</span>
                    </button>
                    <button onClick={() => Router.push(Pages.Checkout)} type="button" className="px-6 py-2 border rounded-md text-white bg-inkredible-black hover:bg-orange-600 transition-all duration-150 ease-out ">
                        <span className="">Continue to</span> Checkout
                    </button>
                </div>
            </div>

        </div>
    );
};

export default ShoppingCart;