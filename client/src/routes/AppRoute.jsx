import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import SignInPage from "../pages/SignInPage";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import { PostRoute } from "./PostRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignInPage />} />

      {/* Dashboard Main Route */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Blog Routes */}
      <Route path="/*" element={<PostRoute />} />
    </Routes>
  );
}
