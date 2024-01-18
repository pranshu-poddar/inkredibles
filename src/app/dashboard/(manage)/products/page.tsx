'use client';
/* eslint-disable @next/next/no-img-element */
import { deleteProductById } from '@/actions/product/delete-product';
import { getAllProducts } from '@/actions/product/get-products';
import ConfirmModal from '@/components/dashboard/confirm-modal';
import CustomButton from '@/components/shared/custom-button';
import { TProductSchema } from '@/lib/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const Page = () => {
    const { data: products, isLoading, isError } = useQuery<TProductSchema[]>({
        queryKey: ['products'],
        queryFn: () => getAllProducts(),
        staleTime: 15 * 60 * 1000,
    });
    const queryClient = useQueryClient();
    const [productId, setproductId] = useState('')
    const [isConfirmModalOpen, setisConfirmModalOpen] = useState(false)

    const deleteProduct = async () => {
        setisConfirmModalOpen(false)
        const res = await deleteProductById(productId);
        if (res.status == 200) {
            toast.success(res.message as string)
            queryClient.invalidateQueries({ queryKey: ['products'] })
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
            {isConfirmModalOpen ? <ConfirmModal action={deleteProduct} closeModal={setisConfirmModalOpen} /> : null}
            <div className='flex justify-end mb-8 w-full'>
                <Link href='/dashboard/products/add'><CustomButton>ADD NEW</CustomButton></Link>
            </div>
            <div className="overflow-auto">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="text-left">
                        <tr className='relative'>
                            <th className="whitespace-nowrap sticky left-0 bg-white px-4 py-2 font-medium text-gray-900">Name</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Category</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Price</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Discount</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Description</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Product Details</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Created At</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Updated At</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Images</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">update</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">delete</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y relative divide-gray-200">
                        {products?.map((product) => {
                            return <tr className='p-0' key={product.name}>
                                <td className="whitespace-nowrap sticky bg-white left-0 px-4 py-2 font-medium text-gray-900">{product.name}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{product.category}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">₹ {product.price}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{product.discount} %</td>
                                <td className="w-[30rem] line-clamp-5 overflow-scroll px-4 py-2  text-gray-700">{product.description}</td>
                                <td>
                                    <table className='border'>
                                        <thead>
                                            <tr className='relative'>
                                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Color</th>
                                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Size</th>
                                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y border-t relative divide-gray-200">
                                            {product?.productDetails.map((detail) => {
                                                return (
                                                    <tr className='p-0' key={detail.color}>
                                                        <td className="px-4 py-2 text-gray-700">{detail.color}</td>
                                                        <td className="px-4 py-2 text-gray-700">{detail.size}</td>
                                                        <td className="px-4 py-2 text-gray-700">{detail.quantity}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </td>

                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{product?.createdAt?.toLocaleDateString()}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{product?.updatedAt?.toLocaleDateString()}</td>
                                <td className='w-[20rem]  grid grid-cols-3 gap-1'>
                                    {product?.imageUrl.map((url) => {
                                        return <img src={url} alt="" key={url} className="w-20  object-cover " />
                                    })}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2">
                                    <a
                                        href="#"
                                        className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                                    >
                                        Update
                                    </a>
                                </td>
                                <td className="whitespace-nowrap px-4 py-2">
                                    <button
                                        onClick={() => { setproductId(product.id || ""); setisConfirmModalOpen(true) }}
                                        className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                                    >
                                        Delete
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