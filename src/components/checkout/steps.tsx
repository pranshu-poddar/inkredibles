import React from 'react';

const Steps = ({currentStep}:{currentStep: number}) => {
    return (
        <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8'>
            <h2 className="sr-only">Steps</h2>

            <div>
                <div className="overflow-hidden rounded-full bg-gray-200">
                    <div className={`h-2 rounded-full bg-orange-600 ${currentStep == 1?"w-2":currentStep==2?"w-1/2":"w-full"}`}></div>
                </div>

                <ol className="mt-4 grid grid-cols-3 text-sm font-medium text-gray-500">
                    <li className={`flex items-center justify-start sm:gap-1.5 ${currentStep >= 1? "text-orange-600" : ""}`}>
                        <span className="hidden sm:inline"> Cart </span>

                        <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill='currentColor'
                            stroke-width="1" className="h-6 w-6 sm:h-5 sm:w-5" viewBox="0 0 24 24"><path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z" /></svg>
                    </li>

                    <li className={`flex items-center justify-center sm:gap-1.5 ${currentStep >= 2? "text-orange-600" : ""}`}>
                        <span className="hidden sm:inline"> Address </span>

                        <svg
                            className="h-6 w-6 sm:h-5 sm:w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                    </li>

                    <li className={`flex items-center justify-end sm:gap-1.5 ${currentStep == 3? "text-orange-600" : ""}`}>
                        <span className="hidden sm:inline"> Payment </span>

                        <svg
                            className="h-6 w-6 sm:h-5 sm:w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                            />
                        </svg>
                    </li>
                </ol>
            </div>
        </div>
    );
};

export default Steps;