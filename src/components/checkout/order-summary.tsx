'use client'
import { getProductById } from '@/actions/product/get-products';
import { TCartItem } from '@/lib/types';
import useAddressStore from '@/store/address-store';
import { useCartStore } from '@/store/cart-store';
import { useQueries } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useStore } from 'zustand';
import useRazorpay from "react-razorpay";
import { CommonAssets } from '@/constants/assets.constant';
import { Pages } from '@/constants/page.constant';


const shippingCharges = 89;

const OrderSummary = () => {
    const router = useRouter();
    const pathName = usePathname();
    const step = pathName == '/checkout/cart' ? 1 : pathName == '/checkout/address' ? 2 : 3;
    const cart = useStore(useCartStore, (state) => state.items);
    const user = localStorage.getItem('user')? JSON.parse(localStorage.getItem('user') || '') : {}
    const selectedAddress = useStore(useAddressStore, (state) => state.selectedAddress)
    const queryArray = cart?.map((item: TCartItem) => ({
        queryKey: ['cartitems', item.productId],
        queryFn: () => getProductById(item.productId), // Fetch data for each item
    }))
    const [Razorpay] = useRazorpay();
    const cartItems = useQueries({ queries: queryArray ?? [] });
    const items = cartItems.map((item) => item.data)
    let totalAmount: number = 0;
    let subTotal: number = 0;
    if (items && cart) {
        items?.map((item, i) => { return totalAmount += ((100 - (item?.discount || 0)) / 100 * (item?.price || 0)) * cart[i].quantity })
        items?.map((item, i) => { return subTotal += (item?.price || 0) * cart[i].quantity })
    }
    let discount: number = (subTotal - totalAmount) / subTotal * 100;

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

        const { id } = await response.json();

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY || "",
            amount: ((totalAmount + shippingCharges) * 100).toString(),
            currency: "INR",
            name: "Inkredible",
            description: "Payment for Purchase",
            image: "/image.png",
            order_id: id,
            handler: function (response: any) {
                console.log(response);
                setPaymentLoading(false);
                router.push(Pages.OrderSummary)
            },
            prefill: {
                name: user.name,
                email: user.email,
                contact: user.phone,
            },
            theme: {
                color: "#528FF0",
            },
        };

        const rzp = new Razorpay(options);
        rzp.on("payment.failed", function (response: { error: { code: any; description: any; source: any; step: any; reason: any; metadata: { order_id: any; payment_id: any; }; }; }) {
            toast.error(response.error.description);
        });
        rzp.open();
    };

    const handleNavigate = () => {
        if (step == 1) {
            router.push("/checkout/address")
        } else {
            if (!selectedAddress) {
                toast.error("select a billing address")
            }
            else handlePayment()
        }
    }
    return (
        <div className='space-y-4'>
            <Toaster />
            <div className="flex h-fit sticky top-0 flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 drop-shadow-sm space-y-6">
                <h3 className="text-xl  font-semibold leading-5 text-inkredible-black">Summary</h3>
                <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                    <div className="flex justify-between w-full">
                        <p className="text-base  leading-4 text-inkredible-black">Total MRP</p>
                        <p className="text-base  leading-4 text-gray-600">₹{subTotal}</p>
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <p className="text-base  leading-4 text-inkredible-black">Discount on MRP</p>
                        <p className="text-base  leading-4 text-gray-600">-₹{subTotal - totalAmount} ({discount}%)</p>
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <p className="text-base  leading-4 text-inkredible-black">Shipping</p>
                        <p className="text-base  leading-4 text-gray-600">₹{shippingCharges}</p>
                    </div>
                </div>
                <div className="flex justify-between items-center w-full">
                    <p className="text-base  font-semibold leading-4 text-inkredible-black">Total Amount</p>
                    <p className="text-base  font-semibold leading-4 text-gray-600">₹{totalAmount + shippingCharges}</p>
                </div>
            </div>
            <div className="w-full flex justify-center items-center">
                <button onClick={handleNavigate} className="hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">{step == 1 ? "Continue to payment" : paymentLoading ? 'Processing...' : 'Pay Now'}</button>
            </div>
        </div>
    );
};

export default OrderSummary;