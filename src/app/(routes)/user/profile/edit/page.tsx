'use client';
import { getAccountFromSessionId } from '@/actions/account/get-accounts';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import Cookies from 'js-cookie';
import CustomInput from '@/components/shared/custom-input';
import { FormProvider, useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { TUser, UserSchema } from '@/lib/types';
import { buttonStyles } from '@/components/shared/custom-button';
import { UpdateAccount } from '@/actions/account/update-account';

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

  const methods = useForm<TUser>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      gender: user?.gender || "",
      DOB: user?.DOB || new Date(),
      firstName: user?.user.firstName || "",
      lastName: user?.user.lastName || "",
      email: user?.user.email || "",
      phone: user?.user.phone || "",
    }
  });
  const { setValue, getValues,register, trigger, formState: { errors } } = methods

  const queryClient = useQueryClient() || new QueryClient()
  const mutation = useMutation({
    mutationFn: (data: TUser) => {
      const accountId = Cookies.get('at') || "";
      return UpdateAccount({ accountId, data });
    },
    onSuccess: () => {
      toast.success("Details updated successfully!");
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const onSubmit = (data: TUser) => {
    mutation.mutate(data);
  }

  return (
    <FormProvider {...methods}>
      <Toaster />
      <div className=" bg-white rounded w-1/2 h-[85%] drop-shadow p-2 ">
        <div className='p-4 bg-white sticky inset-0 flex h-fit w-full justify-between'>
          <span className='font-semibold z-50 h-fit text-gray-600'>EDIT PROFILE</span>
        </div>
        <div className='h-[90%] overflow-scroll relative'>
          <form onSubmit={methods.handleSubmit(onSubmit)} className='grid pt-2 grid-cols-1 gap-x-6 gap-y-8 min-h-full px-2 sm:grid-cols-6 w-full'>
            <CustomInput error={errors.firstName?.message} label="First Name" type="text" name="firstName" placeholder="First Name" span="sm:col-span-3" />
            <CustomInput error={errors.lastName?.message} label="Last Name" type="text" name="lastName" placeholder="Last Name" span="sm:col-span-3" />
            <CustomInput error={errors.phone?.message} label="Phone Number" type="text" name="phone" placeholder="Phone Number" span="sm:col-span-6" />
            <CustomInput error={errors.email?.message} label="Email" type="email" name="email" placeholder="email" span="sm:col-span-6" />
            <div className='flex items-center gap-4'>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-900"> Gender </label>
              <select
                {...register('gender')}
                name='gender'
                className=" min-w-fit border drop-shadow-sm rounded border-gray-300 p-2 text-gray-700 sm:text-sm"
              >
                <option disabled value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <CustomInput  error={errors.DOB?.message} label="D.O.B" type="date" name="DOB" placeholder="D.B.O" span="sm:col-span-6" />
            <input disabled={mutation.isPending} type='submit' className={`${buttonStyles.base} ${buttonStyles.large} col-span-6 sticky bottom-0 disabled:bg-gray-500`} placeholder='ADD ADDRESS' value={mutation.isPending ? 'UPDATING...' : 'UPDATE PROFILE'} />
          </form>
        </div>
      </div>
    </FormProvider>
  );
};

export default Page;