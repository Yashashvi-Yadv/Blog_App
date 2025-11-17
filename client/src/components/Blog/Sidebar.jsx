import { useState } from "react";
import { useUser } from "../../context/UserContext";
import {
  Home,
  FilePlus,
  BookOpen,
  LogOut,
  X,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  Bell,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar({ open, toggleSidebar }) {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false); // ✅ for desktop collapse toggle

  const handleLogout = async () => {
    await logout();
    navigate("/signin");
  };

  return (
    <>
      {/* 🩶 Background Overlay on Mobile */}
      {open && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* 📱 / 💻 Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow-xl z-50 
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          ${collapsed ? "w-20" : "w-64"}
          lg:translate-x-0 lg:static lg:shadow-none lg:border-r`}
      >
        {/* Header for Mobile */}
        <div className="flex items-center justify-between p-4 border-b lg:hidden">
          <h2 className="text-lg font-semibold text-blue-600">Menu</h2>
          <button onClick={toggleSidebar}>
            <X size={22} />
          </button>
        </div>

        {/* Collapse Button (Visible only on desktop) */}
        <div className="hidden lg:flex justify-end p-3 border-b">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-md hover:bg-gray-100 transition"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* User Info */}
        {!collapsed && (
          <div className="hidden lg:flex items-center gap-3 p-4 border-b">
            <img
              src={user.picture}
              alt={user.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="text-sm font-semibold text-gray-800">
                {user.name}
              </h3>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
              <p className="text-xs text-gray-500 truncate">
                Total Posts: {user.totalPosts}
              </p>
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="flex flex-col p-4 space-y-3 text-gray-700">
          <Link
            onClick={toggleSidebar}
            to="/dashboard"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <Home size={18} />
            {!collapsed && <span>Home Feed</span>}
          </Link>

          <Link
            onClick={toggleSidebar}
            to="/dashboard/create"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <FilePlus size={18} />
            {!collapsed && <span>Create Blog</span>}
          </Link>

          <Link
            onClick={toggleSidebar}
            to="/dashboard/myblogs"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <BookOpen size={18} />
            {!collapsed && <span>My Blogs</span>}
          </Link>

          <Link
            onClick={toggleSidebar}
            to="/dashboard/follow"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <UserPlus size={18} />
            {!collapsed && <span>Follow </span>}
          </Link>

          <Link
            onClick={toggleSidebar}
            to="/dashboard/notification"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <Bell size={18} />
            {!collapsed && <span>Follow </span>}
          </Link>
        </nav>

        {/* Logout */}
        <div className="mt-auto border-t p-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-500 hover:bg-red-50 p-2 w-full rounded-lg transition"
          >
            <LogOut size={18} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
