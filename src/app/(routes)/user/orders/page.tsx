import { orderMock } from '@/components/user/mock/order.mock';
import OrderCard from '@/components/user/order-card';
import React from 'react';

const OrdersPage = () => {
  return (
    <div className='space-y-3 w-full'>
      {orderMock.map((order) => {
        return <div key={order.id}><OrderCard product={order} /></div>
      })}
    </div>
  );
};

export default OrdersPage;