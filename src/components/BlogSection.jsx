import { Link } from "react-router-dom";
import blogs from "../data/blogs";

export default function BlogSection() {
  return (
    <section className="py-16 bg-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Blog Posts</h2>
          <p className="text-lg text-gray-600">Insights, awareness, and stories from the world of blood donation</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white cursor-pointer rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
            >
              <div className="w-full h-64 overflow-hidden rounded">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition duration-300 transform hover:scale-105"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{blog.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{blog.excerpt}</p>
                <Link
                  to={`/blog/${blog.id}`}
                  className="text-red-600 font-medium hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
