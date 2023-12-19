import React from 'react';
import CustomInput from '../shared/custom-input';

type AdressFormProps = {
    setstep: React.Dispatch<React.SetStateAction<number>>
}

const AddressForm = ({setstep}:AdressFormProps) => {
    return (
        <div >
            <div className="">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive the order.</p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <CustomInput label='First Name' name='firstName' type='text' placeholder='First Name' />
                    <CustomInput label='Last Name' type='text' name='lastName' placeholder='Last Name' />
                    <CustomInput label='Email' type='email' name='email' placeholder='Email' />
                    <CustomInput label='Phone Number' type='text' name='phone' placeholder='Phone Number' />
                    <CustomInput label='Street Address' type='text' name='address' placeholder='Address' span='sm:col-span-6' />
                    <CustomInput label='City' type='text' name='city' placeholder='City' span='sm:col-span-2' />
                    <CustomInput label='State' type='text' name='state' placeholder='State' span='sm:col-span-2' />
                    <CustomInput label='Zip Code' type='text' name='zip' placeholder='Zip Code' span='sm:col-span-2' />
                </div>
                <div className=" flex mt-10 max-sm:flex-col justify-between gap-4 sm:items-center">
                    <button onClick={() => setstep(1)} className="hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 px-10  bg-gray-800 text-base font-medium leading-4 text-white">Back to Cart</button>
                    <button onClick={() => setstep(3)} className="hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 px-10  bg-gray-800 text-base font-medium leading-4 text-white">Continue to Payment</button>
                </div>
            </div>
        </div>
    );
};

export default AddressForm;