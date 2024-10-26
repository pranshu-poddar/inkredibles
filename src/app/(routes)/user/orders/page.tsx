'use client'; // Ensuring it's a client-side component

import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query'; // TanStack Query import
import OrderCard from '@/components/user/order-card'; // Import the order card component
import { getUserOrders } from '@/actions/account/order'; // Adjust path based on your structure
import Cookies from "js-cookie"; // For session token
import Link from 'next/link';
import { Pages } from '@/constants/page.constant';

const OrdersPage = () => {
  const [isHydrated, setIsHydrated] = useState(false); // State to check hydration
  const sessionId = Cookies.get("sessionToken") || ""; // Get sessionId from session data

  // Use useEffect to ensure the component is only rendered after hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Use TanStack Query to fetch user orders
  const { data: orders, isLoading, isError } = useQuery({
    queryKey: ['orders', sessionId],
    queryFn: () => getUserOrders(sessionId), // Fetch function
    enabled: !!sessionId && isHydrated, // Only fetch if sessionId and hydration is complete
    refetchOnWindowFocus: false,
  });

  // If not hydrated, don't render the component to prevent mismatch
  if (!isHydrated) {
    return null; // Return null until hydration is complete
  }

  // Loading state
  if (isLoading) {
    return <div className='flex justify-center items-center w-full h-[70vh]'>Loading...</div>;
  }

  // Error state
  if (isError) {
    return <div className='flex justify-center items-center w-full h-[70vh]'>Error loading orders. Please try again later.</div>;
  }

  // No orders found
  if (!orders || orders.length === 0) {
    return <div className='flex justify-center items-center w-full h-[70vh]'>No orders found.</div>;
  }

  return (
    <div className='space-y-3 w-full'>
      {orders.map((order: any) => (
        <Link href={Pages.OrderDetails+"?orderId="+order.id} key={order.orderId} className='border hover:shadow-md p-4 flex flex-col gap-4 rounded shadow'>
          <h2 className='text-lg font-bold'>Order ID: {order.orderId}</h2>
          <p>Total Amount: ₹{order.totalAmount}</p>
          <div className='space-y-2'>
            {order.items.map((item: any) => (
              <OrderCard key={item.productId} product={item} />
            ))}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default OrdersPage;
