/* eslint-disable @next/next/no-img-element */
'use client';

import { TUser } from '@/lib/types';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { getOrderById } from '@/actions/account/order';
import ErrorMessage from '@/components/shared/error-message';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { Pages } from '@/constants/page.constant';

const Page = () => {
    const query = useSearchParams();
    const [user, setUser] = useState<TUser | undefined>(undefined);
    const [authError, setAuthError] = useState(false);  // Track authentication error
    const orderId = query.get('orderId');
    const sessionId = Cookies.get("sessionToken") || "";

    useEffect(() => {
        const storedUser = localStorage && JSON.parse(localStorage.getItem('user') || "");
        setUser(storedUser);
    }, []);

    const { data: orderDetails, isLoading, isError, refetch } = useQuery({
        queryKey: ['orderDetails', orderId],
        queryFn: async () => {
            try {
                return await getOrderById(sessionId, orderId ?? "");
            } catch (error: any) {
                if (error?.message === "User is not authenticated") {
                    setAuthError(true);  
                }
                throw error;
            }
        },
        enabled: !!orderId, 
        refetchOnWindowFocus: false,
    });

    if (isLoading) {
        return <div>Loading order details...</div>;
    }

    if (authError) {
        return (
            <ErrorMessage
                message="You must be logged in to view your order details."
                actionText="Go to Login"
                onRetry={() => window.location.href = '/login'}
            />
        );
    }

    if (isError) {
        return (
            <ErrorMessage
                message="Error loading order details. Please try again."
                onRetry={refetch}
            />
        );
    }

    return (
        <section className="flex items-center bg-gray-100 font-poppins">
            <div className="flex-1 max-w-6xl px-4 py-6 mx-auto bg-white border rounded-md md:py-10 md:px-10">
                <h1 className="mb-6 text-2xl font-semibold tracking-wide text-gray-700">
                    Thank you. Your order has been received.
                </h1>
                
                {/* User Information */}
                <div className="flex items-start space-x-4 mb-8">
                    <img src="https://i.postimg.cc/RhQYkKYk/pexels-italo-melo-2379005.jpg" className="w-16 h-16 rounded-md" alt="avatar" />
                    <div>
                        <p className="text-lg font-semibold text-gray-800">{user?.firstName} {user?.lastName}</p>
                        <p className="text-sm text-gray-600">{user?.phone}</p>
                        <p className="text-sm text-gray-600">{user?.email}</p>
                    </div>
                </div>
                
                {/* Order Summary */}
                <div className="border-b border-gray-200 pb-4 mb-8">
                    <div className="flex flex-col md:flex-row md:space-x-6 lg:space-x-8">
                        <div className="mb-4">
                            <p className="text-sm text-gray-600">Order Number:</p>
                            <p className="text-base font-semibold text-gray-800">{orderDetails?.orderId}</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-sm text-gray-600">Date:</p>
                            <p className="text-base font-semibold text-gray-800">{`${orderDetails?.createdAt.toDateString()}`}</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-sm text-gray-600">Total:</p>
                            <p className="text-base font-semibold text-blue-600">Rs.{orderDetails?.totalAmount}</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-sm text-gray-600">Payment Method:</p>
                            <p className="text-base font-semibold text-gray-800">Online</p>
                        </div>
                    </div>
                </div>

                {/* Shipping Details */}
                <div className="mb-10">
                    <h2 className="mb-2 text-xl font-semibold text-gray-700">Shipping Details</h2>
                    <div className="space-y-2">
                        <p className="text-sm text-gray-600">Address: {orderDetails?.shippingAddress.street}</p>
                        <p className="text-sm text-gray-600">City: {orderDetails?.shippingAddress.city}</p>
                        <p className="text-sm text-gray-600">State: {orderDetails?.shippingAddress.state}</p>
                        <p className="text-sm text-gray-600">Postal Code: {orderDetails?.shippingAddress.pin}</p>
                    </div>
                </div>

                {/* Order Items */}
                <div className="mb-10">
                    <h2 className="mb-2 text-xl font-semibold text-gray-700">Order Details</h2>
                    <div className="space-y-4">
                        {orderDetails?.items.map((item) => (
                            <div key={item.orderId} className="flex items-start justify-between p-4 border rounded-md">
                                <div className="flex items-center gap-4">
                                    <Image src={item.image} alt={item.productId} width={80} height={80} className="rounded-md" />
                                    <div>
                                        <h4 className="text-lg font-medium text-gray-800">{item.productId}</h4>
                                        <p className="text-sm text-gray-600">Color: {item.color}</p>
                                        <p className="text-sm text-gray-600">Size: {item.size}</p>
                                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                    </div>
                                </div>
                                <p className="text-lg font-semibold text-blue-600">₹{item.price}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col items-start justify-start gap-4">
                    <Link href={Pages.Shop} className="w-fit px-4 py-2 text-blue-500 border border-blue-500 rounded-md hover:text-gray-100 hover:bg-blue-600 text-left">
                        Go back shopping
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Page;
