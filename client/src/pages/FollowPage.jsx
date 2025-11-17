import React, { useState } from "react";
import axios from "axios";
import axiosinstance from "../api/axiosInstance";
import { useUser } from "../context/UserContext";

export default function FollowRequestPage() {
  const { user } = useUser(); // destructure properly

  const [email, setEmail] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  const currentUserId = user._id;

  // 🔍 Search user by email
  const searchUser = async () => {
    setLoading(true);
    setSearchResult(null);
    setMessage("");
    console.log(email);
    try {
      const res = await axiosinstance.get(`/api/auth/search/${email}`);
      setSearchResult(res.data.user);
    } catch (err) {
      setMessage("❌ User not found");
    }

    setLoading(false);
  };

  // 📩 Send follow request
  const sendRequest = async () => {
    if (!searchResult) return;

    setSending(true);
    setMessage("");

    try {
      await axiosinstance.post("/api/request/follow", {
        fromUser: currentUserId,
        toUser: searchResult._id,
      });

      setMessage("✅ Follow request sent!");
    } catch (err) {
      setMessage("⚠️ Request failed or already sent!");
    }

    setSending(false);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6 text-blue-600">
        Search User & Send Follow Request
      </h2>

      {/* Input */}
      <input
        type="email"
        placeholder="Enter user email..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={searchUser}
        className="w-full mt-3 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        {loading ? "Searching..." : "Search User"}
      </button>

      {/* Result Card */}
      {searchResult && (
        <div className="mt-6 p-4 border rounded-lg shadow-sm bg-gray-50">
          <h3 className="text-xl font-bold">{searchResult.name}</h3>
          <p className="text-gray-600">{searchResult.email}</p>

          <button
            onClick={sendRequest}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            {sending ? "Sending..." : "Send Follow Request"}
          </button>
        </div>
      )}

      {/* Message */}
      {message && (
        <p className="mt-4 text-center font-medium text-green-600">{message}</p>
      )}
    </div>
  );
}
