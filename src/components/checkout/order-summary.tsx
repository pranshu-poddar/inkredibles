'use client';

import { getProductById } from '@/actions/product/get-products';
import { TCartItem } from '@/lib/types';
import useAddressStore from '@/store/address-store';
import { useCartStore } from '@/store/cart-store';
import { useQueries } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast, { Renderable, Toast, Toaster, ValueFunction } from 'react-hot-toast';
import { useStore } from 'zustand';
import useRazorpay from "react-razorpay";
import { Pages } from '@/constants/page.constant';
import { createOrder } from '@/actions/order/create-order';

const shippingCharges = 89;

const OrderSummary = () => {
    const router = useRouter();
    const pathName = usePathname();
    const step = pathName === '/checkout/cart' ? 1 : pathName === '/checkout/address' ? 2 : 3;
    const cart = useStore(useCartStore, (state) => state.items);
    const user = typeof window !== 'undefined' && window.localStorage
        ? JSON.parse(localStorage.getItem('user') || '{}')
        : {};
    const selectedAddress = useStore(useAddressStore, (state) => state.selectedAddress);
    
    const queryArray = cart?.map((item: TCartItem) => ({
        queryKey: ['cartitems', item.productId],
        queryFn: () => getProductById(item.productId),
    }));

    const [Razorpay] = useRazorpay();
    const cartItems = useQueries({ queries: queryArray ?? [] });
    const items = cartItems.map((item) => item.data);
    
    let subTotal = 0;
    let totalAmount = 0;
    if (items && cart) {
        items?.forEach((item, i) => {
            const quantity = cart[i].quantity;
            const itemPrice = item?.price || 0;
            const discountPrice = (100 - (item?.discount || 0)) / 100 * itemPrice;
            subTotal += itemPrice * quantity;
            totalAmount += discountPrice * quantity;
        });
    }

    const discount = subTotal ? ((subTotal - totalAmount) / subTotal) * 100 : 0;

    const [paymentLoading, setPaymentLoading] = useState(false);

    const handlePayment = async () => {
        setPaymentLoading(true);

        const response = await fetch("/api/payment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount: totalAmount + shippingCharges,
                currency: "INR",
            }),
        });
        
        const { order } = await response.json();

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY || "",
            amount: ((totalAmount + shippingCharges) * 100).toString(),
            currency: "INR",
            name: "Inkredible",
            description: "Payment for Purchase",
            image: "/image.png",
            order_id: order.id,
            handler: async (response: any) => {
                
                // Prepare data for creating the order
                const orderData = {
                    orderId: order.id,
                    accountId: user.id,
                    totalAmount: totalAmount + shippingCharges,
                    addressId: selectedAddress?.id ?? "",
                    items: cart.map((cartItem, index) => ({
                        productId: cartItem.productId,
                        quantity: cartItem.quantity,
                        color: cartItem.color,
                        size: cartItem.size,
                        image: items[index]?.imageUrl[0] || "",
                        price: items[index]?.price || 0,
                        total: items[index]?.price || 0 * cartItem.quantity,
                    })),
                };

                const res = await createOrder(orderData);
                console.log(res);

                setPaymentLoading(false);
                useCartStore.getState().clearCart();
                router.push(Pages.Orders);
            },
            prefill: {
                name: user.name,
                email: user.email,
                contact: user.phone,
            },
            notes: { address: user.address },
            theme: {
                color: "#528FF0",
            },
        };

        const rzp = new Razorpay(options);
        rzp.on("payment.failed", (response: { error: { description: Renderable | ValueFunction<Renderable, Toast>; }; }) => {
            toast.error(response.error.description);
        });
        rzp.open();
    };

    const handleNavigate = () => {
        if (step === 1) {
            router.push("/checkout/address");
        } else {
            if (!selectedAddress) {
                toast.error("Select a billing address");
            } else {
                handlePayment();
            }
        }
    };

    return (
        <div className='space-y-4'>
            <Toaster />
            <div className="flex h-fit sticky top-0 flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 drop-shadow-sm space-y-6">
                <h3 className="text-xl font-semibold leading-5 text-inkredible-black">Summary</h3>
                <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                    <div className="flex justify-between w-full">
                        <p className="text-base leading-4 text-inkredible-black">Total MRP</p>
                        <p className="text-base leading-4 text-gray-600">₹{subTotal}</p>
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <p className="text-base leading-4 text-inkredible-black">Discount on MRP</p>
                        <p className="text-base leading-4 text-gray-600">-₹{subTotal - totalAmount} ({discount.toFixed(2)}%)</p>
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <p className="text-base leading-4 text-inkredible-black">Shipping</p>
                        <p className="text-base leading-4 text-gray-600">₹{shippingCharges}</p>
                    </div>
                </div>
                <div className="flex justify-between items-center w-full">
                    <p className="text-base font-semibold leading-4 text-inkredible-black">Total Amount</p>
                    <p className="text-base font-semibold leading-4 text-gray-600">₹{totalAmount + shippingCharges}</p>
                </div>
            </div>
            <div className="w-full flex justify-center items-center">
                <button onClick={handleNavigate} className="hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">
                    {step === 1 ? "Continue to payment" : paymentLoading ? 'Processing...' : 'Pay Now'}
                </button>
            </div>
        </div>
    );
};

export default OrderSummary;
