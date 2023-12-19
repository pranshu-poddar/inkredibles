'use client'
import AddressForm from '@/components/checkout/address-form';
import CartSection from '@/components/checkout/cart-section';
import PaymentPage from '@/components/checkout/payment-page';
import Steps from '@/components/checkout/steps';
import React, { useState } from 'react';

const CheckoutPage = () => {
    const [step, setstep] = useState(1);
    return (
        <div className="container2 mx-auto p-4">
            <Steps currentStep={step} />
            <div className='lg:px-10 pt-16'>
                {step == 1 ? <CartSection setstep={setstep} /> :
                    step == 2 ? <AddressForm setstep={setstep}/> : <PaymentPage />}
            </div>
        </div>
    );
};

export default CheckoutPage;
