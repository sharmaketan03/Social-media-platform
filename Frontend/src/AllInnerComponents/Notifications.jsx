import { useEffect, useState } from "react";
import { Bell, Clock } from "lucide-react";
import instance from "../Components/axios";

export default function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await instance.get("/profile/notifications", {
          withCredentials: true,
        });
        console.log("Notifications fetched:", res.data);

        // ✅ correct field access
        setNotifications(res.data.notifications.reverse());
      } catch (err) {
        console.error("Error fetching notifications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Bell className="animate-ping text-gray-500" size={40} />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-6 p-4">
      <h1 className="text-2xl font-bold mb-5 text-center">Notifications</h1>

      {notifications.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          No notifications yet 📭
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notif) => (
            <div
              key={notif._id}
              className="flex items-center bg-white shadow-sm border border-gray-100 rounded-2xl p-3 hover:bg-gray-50 transition"
            >
              <img
                src={notif.profilePic || "/default-avatar.png"}
                alt="sender"
                className="w-12 h-12 rounded-full object-cover border mr-3"
              />
              <div className="flex-1">
                <p className="text-sm text-gray-800">{notif.message}</p>
                <div className="flex items-center text-xs text-gray-400 mt-1">
                  <Clock size={12} className="mr-1" />
                  {new Date(notif.createdAt).toLocaleString()}
                </div>
              </div>
              {!notif.isRead && (
                <span className="bg-blue-500 h-2 w-2 rounded-full ml-2"></span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
