import React from 'react';

const OrderSummary = () => {
    return (
        <div className="flex h-fit sticky top-0 flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 drop-shadow-sm space-y-6">
            <h3 className="text-xl  font-semibold leading-5 text-inkredible-black">Summary</h3>
            <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                <div className="flex justify-between w-full">
                    <p className="text-base  leading-4 text-inkredible-black">Subtotal</p>
                    <p className="text-base  leading-4 text-gray-600">$56.00</p>
                </div>
                <div className="flex justify-between items-center w-full">
                    <p className="text-base  leading-4 text-inkredible-black">Discount <span className="bg-gray-200 p-1 text-xs font-medium dark:bg-white dark:text-inkredible-black leading-3 text-inkredible-black">STUDENT</span></p>
                    <p className="text-base  leading-4 text-gray-600">-$28.00 (50%)</p>
                </div>
                <div className="flex justify-between items-center w-full">
                    <p className="text-base  leading-4 text-inkredible-black">Shipping</p>
                    <p className="text-base  leading-4 text-gray-600">$8.00</p>
                </div>
            </div>
            <div className="flex justify-between items-center w-full">
                <p className="text-base  font-semibold leading-4 text-inkredible-black">Total</p>
                <p className="text-base  font-semibold leading-4 text-gray-600">$36.00</p>
            </div>
        </div>
    );
};

export default OrderSummary;