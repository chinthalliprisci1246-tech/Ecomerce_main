/*import Container from "@/components/Container";
import { getLatestBlogs } from "@/sanity/quaries";
import { urlFor } from "@/sanity/lib/image";
import { Blog } from "@/sanity.types";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import dayjs from "dayjs";

const BlogPage = async () => {
  const blogs = await getLatestBlogs();

  return (
    <Container className="py-10 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Blog</h1>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-400 py-20">No blogs published yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog: Blog) => (
            <Link
              key={blog._id}
              href={`/blog/${blog?.slug?.current}`}
              className="bg-white rounded-xl shadow-sm border hover:shadow-md transition overflow-hidden group"
            >
              {blog?.mainImage && (
                <div className="overflow-hidden h-48">
                  <Image
                    src={urlFor(blog.mainImage).url()}
                    alt={blog.title ?? "Blog"}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-4 flex flex-col gap-2">
                <h2 className="font-bold text-gray-800 line-clamp-2 group-hover:text-shop-dark-green transition">
                  {blog?.title}
                </h2>
                <p className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                  <Calendar size={12} />
                  {blog?.publishedAt && dayjs(blog.publishedAt).format("MMMM D, YYYY")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </Container>
  );
};

export default BlogPage; */