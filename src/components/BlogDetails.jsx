import { useParams, Link } from "react-router-dom";
import blogs from "../data/blogs";

export default function BlogDetails() {
  const { id } = useParams();

  const blog = blogs.find((b) => b.id === parseInt(id));

  if (!blog) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold">Blog not found</h2>
        <Link to="/" className="text-red-600 hover:underline mt-4 block">
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-96 object-cover rounded-lg shadow-md mb-8"
      />
      <h1 className="text-4xl font-bold text-gray-900 mb-6">{blog.title}</h1>
      <div
        className="prose prose-lg text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
      {/* /blog */}
      <Link
        to="/"
        className="inline-block mt-8 text-red-600 hover:underline"
      >
        ← Back to Blogs
      </Link>
    </article>
  );
}
