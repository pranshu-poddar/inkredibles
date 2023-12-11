"use client";
/* eslint-disable @next/next/no-img-element */
import React, {useState } from "react";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TSignupSchema, signupSchema } from "@/lib/types";
import { Register } from "@/actions/register";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const Router = useRouter();
  const [passwordVisibility, setpasswordVisibility] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<TSignupSchema>({ resolver: zodResolver(signupSchema) });
  const onSubmit = async (data: TSignupSchema) => {
    const response = await Register(data);
    if (response.status == 200 && response.user) {
      Router.push(
        "/otp-verification?email=" +
          encodeURIComponent(data.email) +
          "&id=" +response.user.id,
      );
      reset();
    } else {
      console.log(response.error);
    }
  };



  return (
    <section className="drop-shadow">
      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            <div className="w-full h-auto bg-[url('https://source.unsplash.com/Mv9hjnEUHR4/600x800')] bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"></div>

            <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
              <h3 className="pt-4 text-2xl text-center">Create an Account!</h3>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
              >
                <div className="mb-10 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="firstName"
                    >
                      First Name
                    </label>
                    <input
                      {...register("firstName")}
                      className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded focus:shadow appearance-none focus:outline-none focus:shadow-outline ${errors.firstName && "border-red-500"
                        }`}
                      id="firstName"
                      type="text"
                      placeholder="First Name"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 absolute">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div className="md:ml-2">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="lastName"
                    >
                      Last Name
                    </label>
                    <input
                      {...register("lastName")}
                      className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded focus:shadow appearance-none focus:outline-none focus:shadow-outline ${errors.lastName && "border-red-500"
                        }`}
                      id="lastName"
                      type="text"
                      placeholder="Last Name"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 absolute">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-10 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      {...register("email")}
                      className={`w-full px-3 py-2  text-sm leading-tight text-gray-700 border rounded focus:shadow appearance-none focus:outline-none focus:shadow-outline ${errors.email && "border-red-500"
                        }`}
                      id="email"
                      type="email"
                      placeholder="Email"
                    />
                    {errors.email && (
                      <p className="text-red-500 absolute">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="md:ml-2">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="phone"
                    >
                      Phone
                    </label>
                    <input
                      {...register("phone")}
                      maxLength={10}
                      className={`w-full px-3 py-2  text-sm leading-tight text-gray-700 border rounded focus:shadow appearance-none focus:outline-none focus:shadow-outline ${errors.phone && "border-red-500"
                        }`}
                      id="phone"
                      type="tel"
                      placeholder="phone"
                    />
                    {errors.phone && (
                      <p className="text-red-500 absolute">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-10 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0 relative">
                    <label
                      className="block mb-2 text-sm  font-bold text-gray-700"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      {...register("password")}
                      className={`w-full px-3 py-2  text-sm leading-tight text-gray-700 border rounded focus:shadow appearance-none focus:outline-none focus:shadow-outline ${errors.password && "border-red-500"
                        }`}
                      id="password"
                      type={passwordVisibility ? "text" : "password"}
                      placeholder={
                        passwordVisibility ? "" : "******************"
                      }
                    />
                    <div
                      onClick={() => setpasswordVisibility(!passwordVisibility)}
                      className="absolute -right-6 top-10 cursor-pointer"
                    >
                      {passwordVisibility ? <RiEyeLine /> : <RiEyeCloseLine />}
                    </div>
                    {errors.password && (
                      <p className="text-red-500 absolute ">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <div className="md:ml-2">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="confirmPassword"
                    >
                      Confirm Password
                    </label>
                    <input
                      {...register("confirmPassword")}
                      className={`w-full px-3 py-2  text-sm leading-tight text-gray-700 border rounded focus:shadow appearance-none focus:outline-none focus:shadow-outline ${errors.confirmPassword && "border-red-500"
                        }`}
                      id="confirmPassword"
                      type="password"
                      placeholder="******************"
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 absolute">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold disabled:bg-gray-500 text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting?"Registering":"Register Account"}
                  </button>
                </div>
                <hr className="mb-6 border-t" />

                <div className="text-center">
                  <a
                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    href="/login"
                  >
                    Already have an account? Login!
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

export default SignUp;
