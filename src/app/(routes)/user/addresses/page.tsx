'use client'
import { getAddressesByAccount } from '@/actions/account/address';
import AddressCard from '@/components/checkout/address-card';
import AddressForm from '@/components/checkout/address-form';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { ProductCardSkeleton } from '@/components/shared/skeleton';

const Page = () => {
  const [showAddressForm, setshowAddressForm] = useState(false)
  const accountId = sessionStorage.getItem('at') || "";
  const { data:addresses, isLoading, error } = useQuery({
    queryKey: ['address', accountId],
    queryFn: async () => await getAddressesByAccount(accountId),
    refetchOnWindowFocus: false,
    enabled: !!accountId,
  })

  return (
    <div className="sm:w-[60%]">
      <div>
        <h2 className="text-base font-semibold leading-7 text-gray-900">Select Delievery Address</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive the order.</p>
      </div>
      {isLoading ? <ProductCardSkeleton /> : addresses?.map((address) => { return <div key={address.id} ><AddressCard id={address.id} address={address} /></div> })}
      {showAddressForm ? <AddressForm setshowAddressForm={setshowAddressForm} /> : null}
      <div className="flex mt-6 max-sm:flex-col justify-between gap-4 sm:items-center">
        <button onClick={() => setshowAddressForm(true)} className=" flex items-center gap-2 w-full focus:outline-none p-6 border-2 bg-white border-dotted text-base font-medium leading-4 text-inkredible-black">
          <FaPlus />Add New Address
        </button>
      </div>
    </div>
  );
};

export default Page;