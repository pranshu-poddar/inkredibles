import React from 'react';
import CartItem from '../shared/cart-item';
import { TCartItem } from '@/lib/types';

type CartSectionProps = {
    cart: TCartItem[]
    items: ({
        name: string;
        discount: number;
        price: number;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        category: string;
        imageUrl: string[];
    } | null | undefined)[]
}

const CartSection = ({ cart, items }: CartSectionProps) => {

    return (
        <div className="flex h-fit sticky top-0 flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 drop-shadow-sm space-y-6">
            <h3 className="text-3xl  font-semibold leading-5 text-inkredible-black">Cart</h3>
            <ul className="flex w-full space-y-4 flex-col border-gray-200 divide-y pb-4">
                {
                    cart?.map((item, i) => {
                        return <div key={item.productId}>
                            <CartItem item={item} itemInfo={items[i]} />
                        </div>
                    })
                }
            </ul>
        </div>
    );
};

export default CartSection;