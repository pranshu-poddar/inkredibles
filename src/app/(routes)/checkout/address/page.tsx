'use client'
import { getAddressesByAccount } from '@/actions/account/address';
import AddressCard from '@/components/checkout/address-card';
import AddressForm from '@/components/checkout/address-form';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import Cookies from 'js-cookie';
import { ProductCardSkeleton } from '@/components/shared/skeleton';

const Page = () => {
    const [showAddressForm, setshowAddressForm] = useState(false)
    const accountId = Cookies.get('at') || ""
    const { data,isLoading,error } = useQuery({
        queryKey: ['address', accountId],
        queryFn: async () => getAddressesByAccount(accountId),
    })
    const addresses = data || []

    return (
        <div>
            <div>
                <div className="">
                    <div>
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Select Delievery Address</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive the order.</p>
                    </div>
                    {isLoading ? <ProductCardSkeleton/> :addresses.map((address)=>{return <div key={address.id} ><AddressCard id={address.id} address={address}/></div>})}
                    {showAddressForm ? <AddressForm setshowAddressForm={setshowAddressForm} /> : null}
                    <div className="flex mt-6 max-sm:flex-col justify-between gap-4 sm:items-center">
                        <button onClick={() => setshowAddressForm(true)} className=" flex items-center gap-2 w-full focus:outline-none p-6 border-2 bg-white border-dotted text-base font-medium leading-4 text-inkredible-black">
                            <FaPlus />Add New Address
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;