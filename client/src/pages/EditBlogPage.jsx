import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Blog/Sidebar";
import NavbarDashboard from "../components/Blog/NavbarDashboard";
import axiosInstance from "../api/axiosInstance";

export default function EditBlogPage() {
  const { id } = useParams(); // blog ID from URL
  const navigate = useNavigate();

  const [openSidebar, setOpenSidebar] = useState(false);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const toggleSidebar = () => setOpenSidebar((prev) => !prev);

  // Fetch blog data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axiosInstance.get(`/api/blog/${id}`);
        if (res.data.success) {
          setTitle(res.data.blog.title);
          setContent(res.data.blog.content);
        }
      } catch (err) {
        console.error("Failed to fetch blog:", err);
        alert("Unable to find this blog.");
        navigate("/dashboard/myblogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) return alert("All fields are required");

    try {
      const res = await axiosInstance.put(`/api/blog/update/${id}`, {
        title,
        content,
      });

      if (res.data.success) {
        alert("✅ Blog updated!");
        navigate("/dashboard/myblogs");
      } else {
        alert("Failed to update blog");
      }
    } catch (err) {
      console.error("Update failed:", err);
      alert("Something went wrong!");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Loading blog...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Navbar */}
      <NavbarDashboard toggleSidebar={toggleSidebar} />

      {/* Sidebar */}
      <Sidebar open={openSidebar} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 mt-16 lg:mt-0 p-6 lg:p-10">
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            ✏️ Edit Post
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Edit your post title"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Content *
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 h-48 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Edit your blog content..."
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
