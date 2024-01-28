'use client'
import { verifyOtp } from '@/actions/auth/verify-otp';
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react';
import cookies from 'js-cookie';
import { decodeUrl } from '@/utils/url-parse';
import { Pages } from '@/constants/page.constant';

const OtpVerification = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const userId = searchParams.get("id");
  const redirect = searchParams.get("redirect");
  const [otp, setOtp] = useState("");
  const [verifying, setverifying] = useState(false)

  if (!email || !userId) {
    router.push(Pages.Login)
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setverifying(true)
    try {
      const response = await verifyOtp(otp, decodeUrl(email || ""));
      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(response.user))
        cookies.set('sessionToken', response.sessionToken.toString(), {
          expires: 7, // Set an appropriate expiration time
          path: "/",
          // secure: true, // Ensures the cookie is only sent over HTTPS
          // httpOnly: true, // Helps protect against XSS attacks
          sameSite: 'Strict', // Provides some protection against CSRF attacks
        });
        setverifying(false)
        router.push(redirect || Pages.Home)
      } else {
        console.log(response.message)
      }
    } catch (error) {
      console.log(error)
    }
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
                onSubmit={(e) => onSubmit(e)}
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
                    disabled={verifying}
                    className="w-full px-4 py-2 disabled:bg-gray-400 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    {verifying ? "Verifying..." : "Verify"}
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