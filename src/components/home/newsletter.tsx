"use client";
import React, { useState } from "react";

const Newsletter = () => {
  const [popup, setpopup] = useState(false);
  const [show, setshow] = useState(false);
  const [email, setemail] = useState("");
  setTimeout(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("popup")) {
    } else {
      setpopup(true);
    }
  }, 3000);

  const handleSubmit = () => {};
  return (
    <div
      className={`w-[100%] h-[100dvh] fixed inset-0 tracking-wider z-50 backdrop-blur-sm bg-transparent justify-center items-center ${
        popup ? "flex" : "hidden"
      }`}
    >
      <div className="bg-white relative p-[5rem] flex flex-col border shadow-xl gap-[2rem] max-sm:w-[24rem] w-[45rem] text-center  justify-center items-center">
        <button
          onClick={() => {
            sessionStorage.setItem("popup", JSON.stringify(show));
            setpopup(false);
          }}
          className="absolute transition-all duration-300 bg-gray-800 px-2 py-1 text-white font-medium top-1 right-1"
        >
          Close
        </button>
        <h2 className="text-3xl  tracking-widest">NEWSLETTER</h2>
        <p className=" ">
          Enter your email address to subscribe our notification of our new post
          & features by email
        </p>
        <div className="border-b flex">
          <input
            type="email"
            onChange={(e) => setemail(e.target.value)}
            value={email}
            placeholder="Enter Your Email..."
            className="outline-none w-[20rem] focus:text-gray-dark bg-transparent py-[0.5rem] border-none"
          />
          <button className="" onClick={handleSubmit}>
            Subscribe
          </button>
        </div>

        <div className="flex  items-center">
          <input
            onClick={() => setshow(true)}
            id="link-checkbox"
            type="checkbox"
            className="w-4 h-4 text-orange-600  bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600"
          />
          <label
            htmlFor="link-checkbox"
            className="ml-2 text-sm   text-gray-500"
          >
            Don&apos;t show this popup again .
          </label>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
