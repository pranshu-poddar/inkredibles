"use client";
import { TForgetPasswordSchema, forgetPasswordSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

const ForgetPassword = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    reset,
    handleSubmit,
  } = useForm<TForgetPasswordSchema>({
    resolver: zodResolver(forgetPasswordSchema),
  });
  const onSubmit = (data: TForgetPasswordSchema) => {};
  return (
    <section className="drop-shadow ">
      <div className="container2 mx-auto drop-shadow">
        <div className="flex justify-center px-6 my-12">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            <div className="w-full h-auto bg-[url('https://source.unsplash.com/oWTW-jNGl9I/600x800')] bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"></div>

            <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
              <div className="px-8 mb-4 text-center">
                <h3 className="pt-4 mb-2 text-2xl">Forgot Your Password?</h3>
                <p className="mb-4 text-sm text-gray-700">
                  We get it, stuff happens. Just enter your email address below
                  and we&apos;ll send you a link to reset your password!
                </p>
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
              >
                <div className="mb-8">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    {...register("email")}
                    className={`w-full px-3 py-2  text-sm leading-tight text-gray-700 border rounded focus:shadow appearance-none focus:outline-none focus:shadow-outline ${
                      errors.email && "border-red-500"
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
                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Reset Password
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

export default ForgetPassword;
