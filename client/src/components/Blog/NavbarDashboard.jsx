import { Menu } from "lucide-react";

export default function NavbarDashboard({ toggleSidebar }) {
  return (
    <header className="lg:hidden fixed top-0 left-0 w-full bg-white shadow-sm z-50 flex items-center justify-between px-4 py-3">
      <h1 className="text-xl font-semibold text-blue-600">NextBlog</h1>
      <button
        onClick={toggleSidebar}
        className="text-gray-700 p-2 rounded-md hover:bg-gray-100"
      >
        <Menu size={24} />
      </button>
    </header>
  );
}
