/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { RxCross2 } from "react-icons/rx";
import CartItem from './cart-item';
import { Pages } from '@/constants/page.constant';
import { useRouter } from 'next/navigation';
import useStore from '@/lib/hooks/use-store';
import { useCartStore } from '@/store/cart-store';
import { useQueries, useQuery } from '@tanstack/react-query';
import { getProductById } from '@/actions/product/get-products';
import { TCartItem } from '@/lib/types';

type shoppingCartProps = {
    setshowCart: React.Dispatch<React.SetStateAction<boolean>>
}

const ShoppingCart = ({ setshowCart }: shoppingCartProps) => {
    const Router = useRouter();
    const cart = useStore(useCartStore, (state) => state.items);

    const queryArray = cart?.map((item: TCartItem) => ({
        queryKey: ['cartitems', item.productId],
        queryFn: () => getProductById(item.productId), // Fetch data for each item
    }))

    const cartItems = useQueries({ queries: queryArray ?? [] });
    const items = cartItems.map((item) => item.data)
    let totalAmount: number = 0;
    if (items && cart) {
        items?.map((item, i) => { return totalAmount += ((100 - (item?.discount || 0)) / 100 * (item?.price|| 0)) * cart[i].quantity })

    }
    return (
        <div className="flex flex-col w-[30rem] drop-shadow bg-white h-screen p-6 relative space-y-4 sm:p-10 ">
            <h2 className="text-xl font-semibold">Your cart</h2>
            {cart?.length==0 ? <p>The Cart is empty</p>:null}
            <RxCross2 className="absolute right-6 top-6 w-6 h-auto cursor-pointer" onClick={() => setshowCart(false)} />
            <ul className="flex flex-col divide-y overflow-y-auto pr-4 pb-24">
                {
                    cart?.map((item, i) => {
                        return <div key={item.productId}>
                            <CartItem item={item} itemInfo={items[i]} />
                        </div>
                    })
                }
            </ul>
            <div className="space-y-1 absolute bg-white w-full bottom-0 sm:p-10 p-6 left-0 text-right">
                <p>Total amount:
                    <span className="font-semibold"> ₹{totalAmount}</span>
                </p>
                <p className="text-sm ">Not including taxes and shipping costs</p>
                <div className="flex justify-end space-x-4">
                    <button onClick={()=>Router.push(Pages.Shop)} type="button" className="px-6 py-2 border rounded-md hover:drop-shadow bg-white">Back
                        <span className="sr-only sm:not-sr-only"> to shop</span>
                    </button>
                    {cart?.length !=0 ? <button onClick={() => Router.push(Pages.Checkout)} type="button" className="px-6 py-2 border rounded-md text-white bg-inkredible-black hover:bg-orange-600 transition-all duration-150 ease-out ">
                        <span className="">Continue to</span> Checkout
                    </button>:null}
                </div>
            </div>

        </div>
    );
};

export default ShoppingCart;