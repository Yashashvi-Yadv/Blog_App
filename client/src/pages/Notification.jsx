import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Bell, UserPlus, BadgeCheck } from "lucide-react";
import { useUser } from "../context/UserContext";

const socket = io("http://localhost:4003"); // your notification server

export default function NotificationsPage() {
  const { user } = useUser();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Join user room
    socket.emit("join", user._id);

    // Listen for notifications
    socket.on("notification", (notif) => {
      setNotifications((prev) => [notif, ...prev]);
    });

    return () => {
      socket.off("notification");
    };
  }, []);

  // Simple icon function
  const getIcon = (type) => {
    if (type === "FOLLOW_REQUEST") {
      return <UserPlus size={22} className="text-blue-500" />;
    }
    if (type === "FOLLOW_ACCEPTED") {
      return <BadgeCheck size={22} className="text-green-500" />;
    }
    return <Bell size={22} className="text-gray-500" />;
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-blue-600 flex items-center gap-2">
        <Bell size={24} /> Notifications
      </h2>

      {notifications.length === 0 && (
        <p className="text-gray-500 text-center mt-4">No notifications yet.</p>
      )}

      <div className="space-y-3">
        {notifications.map((notif, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-3 bg-gray-50 border rounded-lg"
          >
            {getIcon(notif.type)}

            <div>
              <p className="text-gray-800">{notif.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
