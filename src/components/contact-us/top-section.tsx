/* eslint-disable @next/next/no-img-element */
import React from "react";
import { FaFax, FaPhoneAlt } from "react-icons/fa";
import { GoMail } from "react-icons/go";
import ContactForm from "./contact-form";

const TopSection = () => {
  return (
    <div className="px-10 gap-8 py-24 flex">
      <div className="w-1/2">
        <h3 className="text-2xl">Contact Us</h3>
        <p className="mt-6 mb-4">
          Claritas est etiam processus dynamicus, qui sequitur mutationem
          consuetudium lectorum. Mirum est notare quam littera gothica, quam
          nunc putamus parum claram anteposuerit litterarum formas human. qui
          sequitur mutationem consuetudium lectorum. Mirum est notare quam
        </p>
        <ul className="[&>*]:py-4 [&>*]:border-t ">
          <li className="flex gap-4">
            <FaFax />
            <span>Address : Your address goes here.</span>
          </li>
          <li className="flex gap-4">
            <FaPhoneAlt />
            <span> demo@example.com</span>
          </li>
          <li className="flex gap-4">
            <GoMail />
            <span>0(1234) 567 890</span>
          </li>
        </ul>
      </div>
      <ContactForm />
    </div>
  );
};

export default TopSection;
