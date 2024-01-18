'use client'
import { getAccountFromSessionId } from '@/actions/account/get-accounts';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Cookies from 'js-cookie';
import CustomButton from '@/components/shared/custom-button';
import Link from 'next/link';
import { Pages } from '@/constants/page.constant';

const AccountPage = () => {
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
    <div className="w-[60%] rounded-lg border border-gray-100 py-3 shadow-sm">
      <dl className="-my-3 divide-y divide-gray-100 text-sm">
        <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Full Name</dt>
          <dd className="text-gray-700 sm:col-span-2">{user?.user.firstName} {user?.user.lastName}</dd>
        </div>

        <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Mobile Number</dt>
          <dd className="text-gray-700 sm:col-span-2">+91 {user?.user.phone}</dd>
        </div>

        <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Email ID</dt>
          <dd className="text-gray-700 sm:col-span-2">{user?.user.email}</dd>
        </div>

        <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Gender</dt>
          <dd className="text-gray-700 sm:col-span-2">Male</dd>
        </div>

        <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Location</dt>
          <dd className="text-gray-700 sm:col-span-2">
            {user?.addresses[0]?.city}, {user?.addresses[0]?.state}
          </dd>
        </div>
      </dl>
      <div className='p-2 mt-4'>
      <Link href={Pages.EditProfile}><CustomButton size='small'>Edit</CustomButton></Link>
      </div>
    </div>
  );
};

export default AccountPage;