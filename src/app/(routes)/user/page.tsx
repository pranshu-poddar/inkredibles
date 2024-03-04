/* eslint-disable @next/next/no-img-element */
'use client';
import { getAccountFromSessionId } from '@/actions/account/get-accounts';
import OverviewCard from '@/components/user/overview-card';
import { OverviewTabs } from '@/config/user-sidebar.config';
import { Pages } from '@/constants/page.constant';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';
import Cookies from 'js-cookie';

const Page = () => {
    const sessionToken = Cookies.get('sessionToken');
    const { data: user, isLoading, isError } = useQuery({
        queryKey: ['user', sessionToken],
        queryFn: async () => {
            const response = await getAccountFromSessionId(sessionToken || "");
            return response;
        },
        staleTime: 1000 * 60 * 100, // 10 minutes
        enabled: !!sessionToken,
    });

    return (
        <div className='sm:w-3/4'>
            <div className='sm:p-6 p-2 relative justify-between w-full bg-gray-100 flex'>
                <div className='flex items-center gap-4'>
                    <div className='w-[8rem] h-[8rem] relative bg-gray-300'>
                        <img className='absolute inset-0 w-full h-full object-cover' src={user?.image ? user?.image : "/images/common/avatar.jpg"} alt='' />
                    </div>
                    <p className='text-gray-800 '>{user?.user.email}</p>
                </div>
                <Link href={Pages.Account} className='border rounded bg-gray-100 hover:drop-shadow text-[10px] font-bold h-fit absolute right-2 top-2 text-inkredible-black border-inkredible-black p-1.5'>EDIT PROFILE</Link>
            </div>
            <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1   gap-8 mt-8'>
                {
                    OverviewTabs.map((overview) => {
                        return <Link href={overview.path} key={overview.label}>
                            <OverviewCard overviewDetails={overview} />
                        </Link>
                    })
                }
            </div>
        </div>
    );
};

export default Page;