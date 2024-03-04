"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TSignupSchema, signupSchema } from "@/lib/types";
import { Register } from "@/actions/auth/register";
import { useRouter, useSearchParams } from "next/navigation";
import { encodeUrl } from "@/utils/url-parse";
import CustomInput from "@/components/shared/custom-input";
import CustomButton from "@/components/shared/custom-button";

const SignUp = () => {
  const Router = useRouter();
  const [passwordVisibility, setpasswordVisibility] = useState(false);
  const methods = useForm<TSignupSchema>({ resolver: zodResolver(signupSchema) });
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = methods;
  const query = useSearchParams();
  const onSubmit = async (data: TSignupSchema) => {
    const response = await Register(data);
    if (response.status == 200 && response.user) {
      Router.push(
        "/otp-verification?email=" +
        encodeUrl(data.email) +
        "&id=" + response.user.id + "&redirect=" + encodeURIComponent(query.get("redirect") || "/"),
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

            <div className="w-full lg:w-7/12 bg-white sm:p-5 rounded-lg lg:rounded-l-none">
              <h3 className="pt-4 text-2xl text-center">Create an Account!</h3>
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="sm:px-8 px-4 pt-6 pb-8 mb-4 bg-white rounded"
                >
                  <div className="sm:mb-10 mb-6 max-sm:gap-6 sm:flex-row flex-col flex gap-4">
                    <CustomInput name="firstName" placeholder="First Name" label="First Name" type="text" error={errors.firstName?.message} />
                    <CustomInput name="lastName" placeholder="Last Name" label="Last Name" type="text" error={errors.lastName?.message} />
                  </div>
                  <div className="sm:mb-10 mb-6 max-sm:gap-6 sm:flex-row flex-col flex md:justify-between">
                    <CustomInput name="email" placeholder="Email" label="Email" type="email" error={errors.email?.message} />
                    <CustomInput name="phone" placeholder="Phone" label="Phone" type="text" error={errors.phone?.message} />
                  </div>
                  <div className="sm:mb-10 mb-6 max-sm:gap-4 sm:flex-row flex-col flex md:justify-between">
                    <div className="mb-4 md:mr-2 md:mb-0 relative">
                      <CustomInput name="password" label="Password" placeholder={passwordVisibility ? "" : "******************"} type={passwordVisibility ? "text" : "password"} error={errors.password?.message} />
                    </div>
                    <CustomInput name="confirmPassword" placeholder="Confirm Password" label="Confirm Password" type="text" error={errors.confirmPassword?.message} />
                  </div>
                  <div className="mb-6 text-center">
                    <CustomButton
                      style={{ width: '100%' }}
                      size="small"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Registering" : "Register Account"}
                    </CustomButton>
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
              </FormProvider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
