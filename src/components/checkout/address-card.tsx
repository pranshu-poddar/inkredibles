import { deleteAddress } from '@/actions/account/address';
import useStore from '@/lib/hooks/use-store';
import { TAddressForm } from '@/lib/types';
import useAddressStore from '@/store/address-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { IoIosCheckmarkCircle, IoIosRadioButtonOff } from "react-icons/io";

const AddressCard = ({ address, id }: { address: TAddressForm, id: string }) => {
    const selectedAddress = useStore(useAddressStore, (state) => state.selectedAddress);
    const { setSelectedAddress } = useAddressStore();
    const queryClient = useQueryClient();

    const mutation = useMutation(
        {
            mutationFn: () => deleteAddress(id),
            onSuccess: () => {
                useAddressStore.getState().deleteSelectedAddress();
                queryClient.invalidateQueries({ queryKey: ['address'] });
                toast.success('Address deleted successfully');
            },
        });

    const handleDeleteAddress = async () => {
        await mutation.mutateAsync();
    };
    return (
        <div className='relative border p-4 mt-4 rounded-xl'>
            <Toaster />
            {selectedAddress?.id == address.id ? <IoIosCheckmarkCircle className='absolute top-4 right-4 text-green-500 text-3xl' />
                : <IoIosRadioButtonOff onClick={() => setSelectedAddress(address)} className='absolute top-4 right-4 cursor-pointer text-inkredible-black text-3xl' />}
            <div className='flex flex-col gap-2'>
                <h4>{address.name}</h4>
                <p>{address.street} {address.city} {address.pin}</p>
                <p>Mobile: <span className='font-semibold text-inkredible-black'>{address.phone}</span></p>
                <p>Email: <span className='font-semibold text-inkredible-black'>{address.email}</span></p>
                <p>Pay on Delivery available</p>
                <div className='flex gap-2 mt-4'>
                    <button onClick={handleDeleteAddress} className="border-inkredible-black text-inkredible-black border font-semibold hover:text-red-600 hover:border-red-600 transition-all duration-300 ease-out px-4 py-2 rounded-md">REMOVE</button>
                    <button className="border-inkredible-black text-inkredible-black border font-semibold px-4 py-2 rounded-md">EDIT</button>
                </div>
            </div>
        </div>
    );
};

export default AddressCard;