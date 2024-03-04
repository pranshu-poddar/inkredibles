'use client'
import { UserSideBar } from '@/config/user-sidebar.config';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Sidebar = () => {
    const pathName = usePathname();
    return (
        <div className='grid h-fit divide-y sm:w-[20%] '>
            {
                UserSideBar.map((route) => {
                    return <Link aria-disabled={pathName==route.path} className={`lg:text-lg sm:text-base text-sm py-4 aria-disabled:text-orange-600 hover:text-orange-600`} key={route.label} href={route.path}>
                        {route.label}
                    </Link>
                })
            }
        </div>
    );
};

export default Sidebar;