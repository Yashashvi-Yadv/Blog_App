export default function BlogCard({ blog }) {
  return (
    <div className="bg-white shadow-sm rounded-xl p-5 hover:shadow-md transition">
      <div className="flex items-center gap-3 mb-3">
        <img
          src={blog.author.picture}
          alt={blog.author.name}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h3 className="font-semibold text-gray-800">{blog.author.name}</h3>
          <p className="text-xs text-gray-500">
            {new Date(blog.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-2 text-gray-800">{blog.title}</h2>
      <p className="text-gray-600 line-clamp-3">{blog.content}</p>
    </div>
  );
}
