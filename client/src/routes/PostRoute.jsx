import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import CreatePostPage from "../pages/CreatePostPage";
import ShowBlog from "../pages/ShowBlog";
import EditBlogPage from "../pages/EditBlogPage";
import FollowRequestPage from "../pages/FollowPage";
import NotificationsPage from "../pages/Notification";
export const PostRoute = () => {
  return (
    <Routes>
      <Route
        path="/dashboard/create"
        element={
          <ProtectedRoute>
            <CreatePostPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/myblogs"
        element={
          <ProtectedRoute>
            <ShowBlog />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/edit/:id"
        element={
          <ProtectedRoute>
            <EditBlogPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/follow"
        element={
          <ProtectedRoute>
            <FollowRequestPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/notification"
        element={
          <ProtectedRoute>
            <NotificationsPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
