/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useState } from 'react';
import { IoLogOutOutline } from 'react-icons/io5';
import CustomButton from './custom-button';
import { usePathname, useRouter } from 'next/navigation';
import { Pages } from '@/constants/page.constant';
import { deleteSession } from '@/actions/auth/session';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import { AccountRoutes } from '@/config/account.config';

type AccountCardProps = {
    sessionToken?: string;
    isOpen: boolean;
    modal: React.Dispatch<React.SetStateAction<boolean>>;
    user: { role: string; name: string; phone: string } | undefined;
};

const AccountCard = ({ sessionToken, isOpen, modal, user }: AccountCardProps) => {
    const pathName = usePathname();
    const router = useRouter();
    const [isLoading, setisLoading] = useState(false);

    const handleLogout = async () => {
        setisLoading(true);

        try {
            if (sessionToken) {
                await deleteSession(sessionToken);
                Cookies.remove('sessionToken');
                Cookies.remove('at');
                localStorage.clear();
                setisLoading(false);
                router.push(Pages.Home);
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <div
            onMouseLeave={() => modal(false)}
            className={`min-w-[16rem] mt-12 drop-shadow bg-white absolute z-40 transition-all duration-300 ease-out ${isOpen ? 'translate-y-0 p-4 opacity-100' : 'translate-y-10 opacity-0 p-0 h-0 overflow-hidden '
                }`}
        >
            <Toaster />
            <div className="pl-4 space-y-4 pr-8">
                {sessionToken ? (
                    <Link href={Pages.Account} className="mb-4 cursor-pointer">
                        <h4 className="text-sm">Hello <span className="capitalize">{user?.name}</span></h4>
                        <p>{user?.phone}</p>
                    </Link>
                ) : (
                    <div className="mb-4">
                        <h4 className="text-sm">Welcome</h4>
                        <p className="mb-2">To access account and manage orders</p>
                        <CustomButton onClick={() => router.push(Pages.Login)} size="small">
                            LOGIN / SIGNUP
                        </CustomButton>
                    </div>
                )}

                <div>
                    {AccountRoutes.map((item) =>
                        !item.roles.includes(user?.role || 'user') ? null : (
                            <Link
                                key={item.label}
                                href={pathName == item.path ? '' : item.path}
                                className={`flex items-center gap-2 pl-2 py-3 border-s-[3px] ${pathName == item.path
                                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                                        : 'border-transparent text-gray-500 hover:border-gray-200 hover:bg-gray-100 hover:text-gray-700'
                                    }`}
                            >
                                <img src={item.icon} alt="" className="w-6 h-auto" />
                                <span className="text-sm font-medium">{item.label}</span>
                            </Link>
                        )
                    )}
                </div>

                {sessionToken && (
                    <CustomButton size="small" onClick={handleLogout}>
                        <span className="flex items-center gap-2">
                            <IoLogOutOutline className="w-6 h-auto" /> {isLoading ? 'Logout...' : 'Logout'}
                        </span>
                    </CustomButton>
                )}
            </div>
        </div>
    );
};

export default AccountCard;
