'use client'
import { getAddressesByAccount } from '@/actions/account/address';
import AddressCard from '@/components/checkout/address-card';
import AddressForm from '@/components/checkout/address-form';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import Cookies from 'js-cookie';
import { ProductCardSkeleton } from '@/components/shared/skeleton';
import { TAddressForm } from '@/lib/types';

const Page = () => {
    const [showAddressForm, setshowAddressForm] = useState(false)
    const [addresses, setaddresses] = useState<TAddressForm[] | null>(null)
    const [accountId, setaccountId] = useState<string>()
    const [isLoading, setisLoading] = useState(true)

    useEffect(() => {
        setaccountId(typeof window !== undefined && sessionStorage.getItem('at') || "")
    }, [])

    const queryClient = useQueryClient();
    useEffect(() => {
        if (addresses === null) {
            console.log('accountId', accountId)
            const getAddresses = async () => {
                const data = await queryClient.fetchQuery({
                    queryKey: ['address', accountId],
                    queryFn: async () => { return await getAddressesByAccount(accountId || '') },
                })
                setaddresses(data)
                setisLoading(false)
            }
            getAddresses()
        }
    }, [accountId, addresses, queryClient])

    return (
        <div>
            <div>
                <div className="">
                    <div>
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Select Delievery Address</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive the order.</p>
                    </div>
                    {isLoading ? <ProductCardSkeleton /> : addresses?.map((address) => { return <div key={address.id} ><AddressCard id={address.id || ""} address={address} /></div> })}
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