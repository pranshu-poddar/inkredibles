import { BlogTypes } from "@/__mocks__/blog.mocks";
import React from "react";
import BlogCard from "./blog-card";
import SliderContainer from "../shared/slider";

const BlogSection = ({ blogs }: { blogs: BlogTypes[] }) => {
  return (
    <div className="container2 text-center ">
      <div className=" px-10">
        <h2 className="font-semibold">Latest Blogs</h2>
        <p className="mt-2 mb-12">
          Contemporary, minimal and modern designs embody the Lavish Alice
          handwriting
        </p>
        <SliderContainer SlidesToShow={3}>
          {blogs.map((blog) => {
            return (
              <div key={blog.title} className="scale-90">
                <BlogCard blog={blog} />
              </div>
            );
          })}
        </SliderContainer>
      </div>
    </div>
  );
};

export default BlogSection;
