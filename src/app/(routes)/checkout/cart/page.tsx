'use client'
import { getProductById } from '@/actions/product/get-products';
import CartSection from '@/components/checkout/cart-section';
import { Pages } from '@/constants/page.constant';
import useStore from '@/lib/hooks/use-store';
import { TCart, TCartItem } from '@/lib/types';
import { useCartStore } from '@/store/cart-store';
import { UseQueryResult, useQueries, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';

const Page = () => {
    const router = useRouter();
    const cart:TCartItem[] | undefined = useStore(useCartStore,(state:TCart) => state.items);
    const queryArray = cart?.map((item: TCartItem) => ({
        queryKey: ['cartitems', item.productId],
        queryFn: () => getProductById(item.productId), // Fetch data for each item
    }))
    if (cart?.length == 0) {
        router.push(Pages.Home)
    }

    const cartItems = useQueries({ queries: queryArray ?? [] });
    const items = cartItems.map((item) => item.data)
    return (
        <div>
            <CartSection items={items} cart={cart} />
        </div>
    );
};

export default Page;