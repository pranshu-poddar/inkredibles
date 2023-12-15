'use client'
import Head from 'next/head';
import React from 'react';

const Tabs = () => {
    return (
        <div className="container-2 ">
            <Head>
                <link rel="stylesheet" href="https://unpkg.com/@themesberg/flowbite@1.2.0/dist/flowbite.min.css" />
                <script async src="https://unpkg.com/@themesberg/flowbite@1.2.0/dist/flowbite.bundle.js"></script>
            </Head>

            <div className="border-b border-gray-200 mt-20 px-10 mb-4">
                <ul className="flex flex-wrap -mb-px" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                    <li className="mr-2" role="presentation">
                        <button className="inline-block text-gray-500 hover:text-orange-500 hover:border-orange-500 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 " id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">MORE INFO</button>
                    </li>
                    <li className="mr-2" role="presentation">
                        <button className="inline-block text-gray-500 hover:text-orange-500 hover:border-orange-500 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2  active" id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="true">DATA SHEET</button>
                    </li>
                    <li className="mr-2" role="presentation">
                        <button className="inline-block text-gray-500 hover:text-orange-500 hover:border-orange-500 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 " id="settings-tab" data-tabs-target="#settings" type="button" role="tab" aria-controls="settings" aria-selected="false">REVIEWS</button>
                    </li>
                </ul>
            </div>
            <div className='px-10' id="myTabContent">
                <div className="bg-gray-50 p-4 rounded-lg  hidden" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    <p className="text-gray-500 text-sm"></p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg " id="dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
                    <p className="text-gray-500 text-sm"></p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg  hidden" id="settings" role="tabpanel" aria-labelledby="settings-tab">
                    <p className="text-gray-500 text-sm"></p>
                </div>
            </div>

        </div>
    );
};

export default Tabs;