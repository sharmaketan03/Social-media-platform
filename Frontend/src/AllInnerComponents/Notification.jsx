
import React, { useEffect, useState } from "react";
import socket from "../Components/Socket.js";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
   
    socket.on("receive_follow_request", (data) => {
      console.log("📩 New Notification:", data);
      setNotifications((prev) => [data, ...prev]); 
    });

   
    return () => {
      socket.off("receive_follow_request");
    };
  }, []);
    //  console.log("Notitifiaction:-",notifications)
  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-xl rounded-2xl">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Notifications</h2>

      {notifications.length === 0 ? (
        <p className="text-gray-500 text-center">No notifications yet.</p>
      ) : (
        <ul className="space-y-3">
          {notifications.map((n, index) => (
            <li
              key={index}
              className="p-3 border rounded-xl bg-gray-50 hover:bg-gray-100 transition"
            >
              <p className="text-gray-800">{n.message}</p>
              <small className="text-gray-500">
                From user ID: <b>{n.senderId}</b>
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notification;
