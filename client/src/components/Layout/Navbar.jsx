import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          NextBlog
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          <Link to="/signin" className="hover:text-blue-600">
            Sign In
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white shadow-lg flex flex-col text-center space-y-2 py-3">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/signin"
            className="text-gray-700 hover:text-blue-600"
            onClick={() => setOpen(false)}
          >
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
}
