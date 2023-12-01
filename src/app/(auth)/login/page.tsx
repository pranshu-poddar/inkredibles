'use client'
/* eslint-disable @next/next/no-img-element */
import { TLoginSchema, loginSchema } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri';

const Login = () => {
    const [passwordVisibility, setpasswordVisibility] = useState(false);
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<TLoginSchema>({ resolver: zodResolver(loginSchema) })
    const onSubmit = (data: TLoginSchema) => {
        console.log(data)
    }
    return (
        <section className="drop-shadow">

            <div className="container2 mx-auto">
                <div className="flex justify-center px-6 my-12">

                    <div className="w-full xl:w-3/4 lg:w-11/12 flex">

                        <div
                            className="w-full h-auto bg-[url('https://source.unsplash.com/K4mSJ7kc0As/600x800')] bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"

                        ></div>

                        <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
                            <h3 className="pt-4 text-2xl text-center">Welcome Back!</h3>
                            <form onSubmit={handleSubmit(onSubmit)} className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                                <div className="mb-8">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="username">
                                        Email
                                    </label>
                                    <input
                                        {...register('email')}
                                        className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded focus:shadow appearance-none focus:outline-none focus:shadow-outline ${errors.email && "border-red-500"}`}
                                        id="email"
                                        type="email"
                                        placeholder="Enter email address"
                                    />
                                    {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                                </div>
                                <div className="mb-8 relative">
                                        <label className="block mb-2 text-sm  font-bold text-gray-700" htmlFor="password">
                                            Password
                                        </label>
                                        <input
                                            {...register('password')}
                                            className={`w-full px-3 py-2  text-sm leading-tight text-gray-700 border rounded focus:shadow appearance-none focus:outline-none focus:shadow-outline ${errors.password && "border-red-500"}`}
                                            id="password"
                                            type={passwordVisibility ? "text" : "password"}
                                            placeholder={passwordVisibility ? "" : "******************"}
                                        />
                                        <div onClick={() => setpasswordVisibility(!passwordVisibility)} className='absolute -right-6 top-10 cursor-pointer'>
                                            {passwordVisibility ? <RiEyeLine /> : <RiEyeCloseLine />}
                                        </div>
                                        {errors.password && <p className='text-red-500 absolute '>{errors.password.message}</p>}

                                    </div>
                                <div className="mb-6 text-center">
                                    <button
                                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                        type="submit"
                                    >
                                        Sign In
                                    </button>
                                </div>
                                <hr className="mb-6 border-t" />
                                <div className="text-center">
                                    <a
                                        className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                        href="/signup"
                                    >
                                        Create an Account!
                                    </a>
                                </div>
                                <div className="text-center">
                                    <a
                                        className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                        href="/forget-password"
                                    >
                                        Forgot Password?
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;