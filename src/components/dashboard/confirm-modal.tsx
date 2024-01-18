'use client'
import React from 'react';

type ConfirmModalProps = {
    action:()=>Promise<void>,
    closeModal:React.Dispatch<React.SetStateAction<boolean>>
}

const ConfirmModal = ({action,closeModal}:ConfirmModalProps) => {
    return (
        <div className='w-screen h-screen fixed z-50 inset-0 backdrop-blur-sm flex items-center justify-center'>
            <div className="rounded-lg bg-white p-8 drop-shadow-2xl">
                <h2 className="text-lg font-bold">Please Confirm</h2>

                <p className="mt-2 text-sm text-gray-500">
                   Once a product is deleted it can not be retrived !
                </p>

                <div className="mt-4 flex gap-2">
                    <button onClick={action} type="button" className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:drop-shadow hover:bg-red-700">
                        Yes, Delete
                    </button>

                    <button onClick={()=>closeModal(false)} type="button" className="rounded bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-inkredible-black hover:text-white hover:drop-shadow">
                        No, Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;