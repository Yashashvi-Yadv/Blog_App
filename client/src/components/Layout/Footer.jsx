import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white border-t py-6 mt-16">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} NextBlog. All rights reserved.</p>
        <div className="flex gap-6 mt-3 sm:mt-0">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          <Link to="/signin" className="hover:text-blue-600">
            Sign In
          </Link>
        </div>
      </div>
    </footer>
  );
}
