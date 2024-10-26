'use client'
import React, { useState } from 'react';
import CustomInput from '../shared/custom-input';
import { FormProvider, useForm } from 'react-hook-form';
import { RxCross2 } from "react-icons/rx";
import { buttonStyles } from '../shared/custom-button';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddressSchema, TAddressForm } from '@/lib/types';
import { createAddress } from '@/actions/account/address';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type AddressFormProps = {
  setshowAddressForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddressForm = ({ setshowAddressForm }: AddressFormProps) => {
  const methods = useForm<TAddressForm>({
    resolver: zodResolver(AddressSchema),
  });
  const { formState: { errors } } = methods
  const queryClient = useQueryClient();

  const accountId = Cookies.get('at') || "";
  const mutation = useMutation({
    mutationFn: (data: TAddressForm) => {
      return createAddress(accountId, data);
    },
    onSuccess: () => {
      toast.success("Address added successfully!");
      queryClient.invalidateQueries({ queryKey: ['address',accountId] });
      setshowAddressForm(false);
    },
  });

  const onSubmit = (data: TAddressForm) => {
    mutation.mutate(data);
  }


  return (
    <FormProvider {...methods}>
      <Toaster />
      <div className='w-screen h-screen fixed inset-0 z-50 flex justify-center items-center bg-gray-500 bg-opacity-50'>
        <div className=" bg-white rounded sm:w-1/3 w-[90%] h-[85%] drop-shadow p-2 ">
          <div className='p-4 bg-white sticky inset-0 flex h-fit w-full justify-between'>
            <span className='font-semibold z-50 h-fit text-gray-600'>ADD NEW ADDRESS</span>
            <RxCross2 className="w-6 cursor-pointer h-auto" onClick={() => setshowAddressForm(false)} />
          </div>
          <div className='h-[90%] overflow-scroll relative'>
            <form onSubmit={methods.handleSubmit(onSubmit)} className='grid pt-2 grid-cols-1 gap-x-6 gap-y-8 min-h-full px-2 sm:grid-cols-6 w-full'>
              <CustomInput error={errors.name?.message} label="Name" type="text" name="name" placeholder="Name" span="sm:col-span-6 col-span-6" />
              <CustomInput error={errors.email?.message} label="Email" type="email" name="email" placeholder="Email" span="sm:col-span-6 col-span-6" />
              <CustomInput error={errors.phone?.message} label="Phone Number" type="text" name="phone" placeholder="Phone Number" span="sm:col-span-6 col-span-6" />
              <CustomInput error={errors.street?.message} label="Street Address" type="text" name="street" placeholder="Address" span="sm:col-span-6 col-span-6" />
              <CustomInput error={errors.city?.message} label="City" type="text" name="city" placeholder="City" span="sm:col-span-6 col-span-6" />
              <CustomInput error={errors.state?.message} label="State" type="text" name="state" placeholder="State" span="sm:col-span-6 col-span-6" />
              <CustomInput error={errors.pin?.message} label="Pin Code" type="text" name="pin" placeholder="Pin Code" span="sm:col-span-6 col-span-6" />
              <input disabled={mutation.isPending} type='submit' className={`${buttonStyles.base} ${buttonStyles.large} col-span-6 sticky bottom-0 disabled:bg-gray-500`} placeholder='ADD ADDRESS' value={mutation.isPending ? 'ADDING...' : 'ADD ADDRESS'} />
            </form>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default AddressForm;
