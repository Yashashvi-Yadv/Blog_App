import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function SignInPage() {
  const { login, isLogged } = useUser();
  console.log(isLogged);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (isLogged) {
      navigate("/dashboard", { replace: true }); // ✅ redirect if already logged in
    }
  }, [isLogged, navigate]);

  const handleSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;
      const decoded = jwtDecode(token);

      const data = {
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
        googleId: decoded.sub,
      };

      const res = await axiosInstance.post("/api/auth/register", data);

      if (res.data.success) {
        login(res.data.users); // ✅ your backend sends `users`
        setTimeout(() => navigate("/dashboard"), 0); // ✅ navigate after state update
      } else {
        alert("Google verification failed");
      }
    } catch (error) {
      console.error("❌ Authentication failed:", error);
      alert("Authentication failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Welcome Back 👋
        </h2>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => console.log("Google login failed")}
        />
      </div>
    </div>
  );
}
