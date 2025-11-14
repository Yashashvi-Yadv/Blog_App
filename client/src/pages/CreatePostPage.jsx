import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Blog/Sidebar";
import NavbarDashboard from "../components/Blog/NavbarDashboard";

export default function CreatePostPage() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setOpenSidebar((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const data = { title, content };
      const res = await axiosInstance.post("/api/blog/create", data);

      if (res.data.success) {
        alert("✅ Blog created successfully!");
        navigate("/dashboard");
      } else {
        alert("Failed to create post");
      }
    } catch (err) {
      console.error("Error creating blog:", err);
      alert("Error creating blog post");
    } finally {
      setLoading(false);
    }
  };

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
            ✍️ Create New Post
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
                placeholder="Enter your post title"
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
                placeholder="Write your blog content here..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              {loading ? "Publishing..." : "Publish Post"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
