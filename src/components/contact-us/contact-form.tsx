import React from "react";

const ContactForm = () => {
  return (
    <div className=" w-1/2">
      <form className="space-y-6">
        <div>
          <label htmlFor="name" className="text-sm">
            Full name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Name*"
            className="w-full focus:outline-orange-600 text-sm  border p-3  "
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm">
            Email
          </label>
          <input
            id="email"
            placeholder="Email*"
            type="email"
            className="w-full focus:outline-orange-600 text-sm  border p-3  "
          />
        </div>
        <div>
          <label htmlFor="message" className="text-sm">
            Message
          </label>
          <textarea
            id="message"
            placeholder="Message*"
            className="w-full focus:outline-orange-600 text-sm h-40 border p-3  "
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-fit bg-orange-600 text-white hover:bg-inkredible-black p-3 text-sm  tracking-wider uppercase "
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
