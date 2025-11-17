import { useEffect, useState } from "react";
import Sidebar from "../components/Blog/Sidebar";
import NavbarDashboard from "../components/Blog/NavbarDashboard";
import Feed from "../components/Blog/Feed";
import axiosInstance from "../api/axiosInstance";

export default function DashboardPage() {
  const [blogs, setBlogs] = useState([]);
  const [openSidebar, setOpenSidebar] = useState(false);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await axiosInstance.get("");
        if (res.data.success) setBlogs(res.data.blogs);
      } catch (err) {
        console.error("Error fetching feed:", err);
      }
    };
    fetchFeed();
  }, []);

  const toggleSidebar = () => setOpenSidebar((prev) => !prev);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Navbar */}
      <NavbarDashboard toggleSidebar={toggleSidebar} />

      {/* Sidebar */}
      <Sidebar open={openSidebar} toggleSidebar={toggleSidebar} />

      {/* Feed Section */}
      <main className="flex-1 lg:ml-64 mt-16 lg:mt-0 p-4 sm:p-6 md:p-8 transition-all duration-300">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
          Your Feed 📰
        </h1>
        <Feed blogs={blogs} />
      </main>
    </div>
  );
}
