'use client';
import { getAllAccounts } from '@/actions/account/get-accounts';
/* eslint-disable @next/next/no-img-element */
import { deleteProductById } from '@/actions/product/delete-product';
import ConfirmModal from '@/components/dashboard/confirm-modal';
import CustomButton from '@/components/shared/custom-button';
import { TProductSchema } from '@/lib/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const Page = () => {
    const { data: accounts, isLoading, isError } = useQuery({
        queryKey: ['accounts'],
        queryFn: () => getAllAccounts(),
        staleTime: 15 * 60 * 1000,
    });
    const queryClient = useQueryClient();
    const [accountId, setaccountId] = useState('')
    const [isConfirmModalOpen, setisConfirmModalOpen] = useState(false)

    const removeUser = async () => {
        setisConfirmModalOpen(false)
        const res = await deleteProductById(accountId);
        if (res.status == 200) {
            toast.success(res.message as string)
            queryClient.invalidateQueries({ queryKey: ['accounts'] })
        } else {
            toast.error(res.message as string)
        }
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading products</div>;
    }


    return (
        <div>
            <Toaster />
            {isConfirmModalOpen ? <ConfirmModal action={removeUser} closeModal={setisConfirmModalOpen} /> : null}
            <div className="overflow-auto">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="text-left">
                        <tr className='relative'>
                            <th className="whitespace-nowrap sticky left-0 bg-white px-4 py-2 font-medium text-gray-900">Full Name</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Image</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Phone Number</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Email</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Cart</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Wishlist</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Orders</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Reviews</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Addresses</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Email Verified</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Created At</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Updated At</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Remove</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y relative divide-gray-200">
                        {accounts?.map((account) => {
                            return <tr className='p-0' key={account.id}>
                                <td className="whitespace-nowrap sticky bg-white left-0 px-4 py-2 font-medium text-gray-900">{account.user.firstName} {account.user.lastName}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                    <Image src={account.image || "/images/common/avatar.jpg"} alt='user profile' height={50} width={75}/>
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{account.user.phone}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{account.user.email}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">cart</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">wishlist</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">orders</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">reviews</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">addresses</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{account.user.emailVerified?.toLocaleDateString() || 'Not Verified'}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{account?.createdAt?.toLocaleDateString()}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{account?.updatedAt?.toLocaleDateString()}</td>
                                <td className="whitespace-nowrap px-4 py-2">
                                    <button
                                        onClick={() => { setaccountId(account.id || ""); setisConfirmModalOpen(true) }}
                                        className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Page;