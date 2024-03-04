"use client";
import { SignIn } from "@/actions/auth/login";
import CustomButton from "@/components/shared/custom-button";
import CustomInput from "@/components/shared/custom-input";
/* eslint-disable @next/next/no-img-element */
import { TLoginSchema, loginSchema } from "@/lib/types";
import { encodeUrl } from "@/utils/url-parse";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";

const Login = () => {
  const Router = useRouter();
  const [passwordVisibility, setpasswordVisibility] = useState(false);
  const methods = useForm<TLoginSchema>({ resolver: zodResolver(loginSchema) });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = methods
  const query = useSearchParams();
  const onSubmit = async (data: TLoginSchema) => {
    const response = await SignIn(data);

    if (response.status == 200 && response.user) {
      Router.push(
        "/otp-verification?email=" +
        encodeUrl(data.email) +
        "&id=" + response.user.id + "&redirect=" + encodeURIComponent(query.get("redirect") || "/"),
      );
      reset();
    }
  }
  return (
    <section className="drop-shadow">
      <div className="container2 mx-auto">
        <div className="flex justify-center sm:px-6 my-12">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            <div className="w-full h-auto bg-[url('https://source.unsplash.com/K4mSJ7kc0As/600x800')] bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"></div>

            <div className="w-full lg:w-1/2 bg-white sm:p-5 rounded-lg lg:rounded-l-none">
              <h3 className="pt-4 text-2xl text-center">Login or Signup</h3>
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
                >
                  <div className="mb-8">
                    <CustomInput name="email" label="Email" placeholder="Email" type="email" error={errors.email?.message} />
                  </div>
                  <div className="mb-8 relative">
                    <CustomInput name="password" label="Password" placeholder={passwordVisibility ? "" : "******************"} type={passwordVisibility ? "text" : "password"} error={errors.password?.message} />
                    <div
                      onClick={() => setpasswordVisibility(!passwordVisibility)}
                      className="absolute -right-6 top-4 cursor-pointer"
                    >
                      {passwordVisibility ? <RiEyeLine /> : <RiEyeCloseLine />}
                    </div>
                  </div>
                  <div className="mb-6 text-center">
                    <CustomButton style={{ width: "100%" }} size="small" type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Signing..." : "Sign In"}
                    </CustomButton>
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
              </FormProvider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
