import React from "react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="bg-gray-50 py-24 px-6 text-center">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-6 leading-tight">
          Welcome to <span className="text-blue-600">NextBlog</span>
        </h1>

        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-8">
          Explore inspiring stories, developer tutorials, and creative ideas
          shared by tech enthusiasts from around the world 🌍
        </p>

        <Link
          to="/signin"
          className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
}
