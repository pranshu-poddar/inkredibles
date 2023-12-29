'use client'
import { verifyOtp } from '@/actions/auth/verify-otp';
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react';
import cookie from 'js-cookie';

const OtpVerification = () => {
  const   Router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const userId = searchParams.get("id");
  const [otp, setOtp] = useState("");
  if (!email || !userId) {
    return redirect("/login");
  }

  const onSubmit = async () => {
    const response = await verifyOtp(otp, email);
    if (response.status === 200) {
      cookie.set('sessionToken', response.sessionToken, {
        expires: 1, // Set an appropriate expiration time
        secure: true, // Ensures the cookie is only sent over HTTPS
        httpOnly: true, // Helps protect against XSS attacks
        sameSite: 'Strict', // Provides some protection against CSRF attacks
        path: '/', // Specify the path where the cookie is valid
      });
    }
    Router.push("/");
  };

  return (
    <section className="drop-shadow ">
      <div className="container2 mx-auto drop-shadow">
        <div className="flex justify-center px-6 my-12">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            <div className="w-full h-auto bg-[url('https://source.unsplash.com/oWTW-jNGl9I/600x800')] bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"></div>

            <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
              <div className="px-8 mb-4 text-center">
                <h3 className="pt-4 mb-2 text-2xl">Verify Your OTP</h3>
                <p className="mb-4 text-sm text-gray-700">
                  An OTP has been send to {email} . Please verify that.
                </p>
              </div>
              <form
                onSubmit={onSubmit}
                className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
              >
                <div className="mb-8">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="otp"
                  >
                    OTP
                  </label>
                  <input
                    onChange={(e) => setOtp(e.target.value)}
                    className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded focus:shadow appearance-none focus:outline-none focus:shadow-outline`}
                    id="otp"
                    type="text"
                    placeholder="Enter OTP"
                  />
                </div>
                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Verify
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OtpVerification;