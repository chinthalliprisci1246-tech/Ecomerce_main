import React from "react";
import { Title } from "./ui/text";
import { getLatestBlogs } from "@/sanity/quaries";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Blog } from "@/sanity.types";
import Link from "next/link";
import { Calendar } from "lucide-react";
import dayjs from "dayjs";

const LatestBlog = async () => {
  const blogs = await getLatestBlogs();

  return (
    <div className="mb-10 lg:mb-20">
      <Title>Latest Blogs</Title>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
        {blogs?.map((blog: Blog) => (
          <div key={blog._id} className="bg-white shadow-sm rounded-md">

            {blog?.mainImage && (
              <Link href={`/blog/${blog?.slug?.current}`}>
                <Image
                  src={urlFor(blog.mainImage).url()}
                  alt="blogImage"
                  width={500}
                  height={500}
                  className="w-full h-48 object-cover"
                />
              </Link>
            )}

            <div className="p-3">
              <h3 className="font-semibold text-sm">
                {blog?.title}
              </h3>

              <p className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                <Calendar size={14} />
                {blog?.publishedAt &&
                  dayjs(blog.publishedAt).format("MMMM D, YYYY")}
              </p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestBlog;
