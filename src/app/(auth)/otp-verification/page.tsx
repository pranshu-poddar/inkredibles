'use client'
import { verifyOtp } from '@/actions/auth/verify-otp';
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import cookies from 'js-cookie';
import { decodeUrl } from '@/utils/url-parse';
import { Pages } from '@/constants/page.constant';
import { AccountAssets } from '@/constants/assets.constant';
import Image from 'next/image';

const OtpVerification = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const userId = searchParams.get("id");
  const redirect = searchParams.get("redirect");
  const [otp, setOtp] = useState("");
  const [verifying, setverifying] = useState(false)

  useEffect(() => {
    if (!email || !userId) {
      router.push(Pages.Login);
    }
  }, [email, userId, router]);
  

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setverifying(true);
    try {
      const decodedEmail = email ? decodeUrl(email) : "";
      const response = await verifyOtp(otp, decodedEmail);
      if (response.status === 200) {
        await Promise.all([
          localStorage.setItem('user', JSON.stringify(response.user)),
          cookies.set('sessionToken', response.sessionToken.toString(), {
            expires: 7,
            path: "/",
            sameSite: 'Strict',
          })
        ]);
        setverifying(false);
        router.push(redirect || Pages.Home);
      } else {
        console.log(response.message);
        setverifying(false);
      }
    } catch (error) {
      console.log(error);
      setverifying(false);
    }
  };
  

  return (
    <section className="drop-shadow ">
      <div className="container2 mx-auto drop-shadow">
        <div className="flex justify-center sm:px-6 my-12">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
          <div className={`w-full h-auto bg-gray-400 overflow-hidden relative hidden lg:block lg:w-1/2 rounded-l-lg`}>
            <Image src={AccountAssets.LoginIn} fill alt="login" className="w-full h-full object-cover rounded-l-lg" />
            </div>

            <div className="w-full lg:w-1/2 bg-white sm:p-5 rounded-lg lg:rounded-l-none">
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