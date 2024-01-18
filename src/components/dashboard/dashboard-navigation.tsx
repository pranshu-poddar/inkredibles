import { DasboardRoutes } from '@/config/dashboard.config';
import React from 'react';

const DashboardNavigation = () => {
    return (
        <div className='sm:px-8'>
            <div className="sm:hidden ">
                <label htmlFor="Tab" className="sr-only">Tab</label>

                <select id="Tab" className="w-full rounded-md border-gray-200">
                    {
                        DasboardRoutes.map((route, index) => {
                            return <option key={route.label}>
                                <a href={route.path} className="shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700">
                                    {route.label}
                                </a>
                            </option>
                        })
                    }
                </select>
            </div>

            <div className="hidden sm:block">
                <nav className="flex gap-6" aria-label="Tabs">
                    {
                        DasboardRoutes.map((route, index) => {
                            return <a key={route.label}
                                href={route.path}
                                className="shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                            >
                                {route.label}
                            </a>
                        })
                    }
                </nav>
            </div>
        </div>
    );
};

export default DashboardNavigation;