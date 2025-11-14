import BlogCard from "./BlogCard";

export default function Feed({ blogs }) {
  if (!blogs || blogs.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        No blogs from followed people yet.
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </div>
  );
}
