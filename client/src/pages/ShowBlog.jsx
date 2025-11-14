import { useEffect, useState } from "react";
import Sidebar from "../components/Blog/Sidebar";
import NavbarDashboard from "../components/Blog/NavbarDashboard";
import axiosInstance from "../api/axiosInstance";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

export default function MyBlogsPage() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleSidebar = () => setOpenSidebar((prev) => !prev);

  const fetchMyBlogs = async () => {
    try {
      const res = await axiosInstance.get("/api/blog/myblog");
      if (res.data.success) setBlogs(res.data.blogs);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (id) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      const res = await axiosInstance.delete(`/api/blog/delete/${id}`);

      if (res.data.success) {
        alert("Blog deleted!");
        setBlogs((prev) => prev.filter((b) => b._id !== id));
      }
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete blog");
    }
  };

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Navbar */}
      <NavbarDashboard toggleSidebar={toggleSidebar} />

      {/* Sidebar */}
      <Sidebar open={openSidebar} toggleSidebar={toggleSidebar} />

      {/* Main */}
      <main className="flex-1 lg:ml-64 mt-16 lg:mt-0 p-6 lg:p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">📚 My Blogs</h1>

        {loading ? (
          <div className="text-center text-gray-600 mt-10">
            Loading your blogs...
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center text-gray-600 mt-10">
            You haven't created any blogs yet.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition"
              >
                {/* Title */}
                <h2 className="text-xl font-semibold mb-2 text-gray-800 line-clamp-1">
                  {blog.title}
                </h2>

                {/* Content Preview */}
                <p className="text-gray-600 line-clamp-3 mb-4">
                  {blog.content}
                </p>

                {/* Footer */}
                <div className="flex justify-between items-center text-sm text-gray-500 mt-4">
                  <span>{new Date(blog.createdAt).toLocaleDateString()}</span>

                  <div className="flex items-center gap-3">
                    {/* Edit */}
                    <Link
                      to={`/dashboard/edit/${blog._id}`}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Pencil size={18} />
                    </Link>

                    {/* Delete */}
                    <button
                      onClick={() => deleteBlog(blog._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
