/* eslint-disable @next/next/no-img-element */
import { BlogTypes } from "@/__mocks__/blog.mocks";
import React from "react";

const BlogCard = ({ blog }: { blog: BlogTypes }) => {
  return (
    <a href="#" className="block text-start space-y-4">
      <img
        alt="Art"
        src={blog.image}
        className="h-64 w-full object-cover sm:h-80 lg:h-96"
      />

      <h3 className="mt-4 font-semibold text-base ">{blog.title}</h3>

      <p>
        By <span className="text-orange-500">Inkredibles </span>/{blog.date}
      </p>

      <p className="mt-2 max-w-sm ">{blog.description}</p>
    </a>
  );
};

export default BlogCard;
