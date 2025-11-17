


// import { useEffect, useState } from "react";
// import { Bell, Clock } from "lucide-react";
// import instance from "../Components/axios";
// import socket from "../AllInnerComponents/socket";

// export default function NotificationPage() {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const res = await instance.get("/profile/notifications", { withCredentials: true });
//         // Add a status field for follow requests
//         const notifs = res.data.notifications.map(n => ({
//           ...n,
//           status: n.type === "followRequest" ? "pending" : undefined
//         }));
//         setNotifications([...notifs].reverse());
//       } catch (err) {
//         console.error("Error fetching notifications:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchNotifications();
//   }, []);

//   useEffect(() => {
//     socket.on("receive-notification", (notif) => {
//       setNotifications(prev => [{ ...notif, status: notif.type === "followRequest" ? "pending" : undefined }, ...prev]);
//     });

//     return () => socket.off("receive-notification");
//   }, []);

//   const handleResponse = async (notifId, action) => {
//     try {
//       await instance.post(`/profile/notifications/${notifId}/${action}`, {}, { withCredentials: true });
//       setNotifications(prev =>
//         prev.map(n => n._id === notifId ? { ...n, status: action, isRead: true } : n)
//       );
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleFollowBack = async (senderId, notifId) => {
//     try {
//       await instance.post(`/profile/followBack/${senderId}`, {}, { withCredentials: true });
//       // Update UI to show follow back done
//       setNotifications(prev =>
//         prev.map(n => n._id === notifId ? { ...n, status: "followed" } : n)
//       );
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (loading) return <div className="flex justify-center items-center h-screen"><Bell className="animate-ping text-gray-500" size={40} /></div>;

//   return (
//     <div className="max-w-md mx-auto mt-6 p-4">
//       <h1 className="text-2xl font-bold mb-5 text-center">Notifications</h1>
//       {notifications.length === 0 ? (
//         <div className="text-center text-gray-500 mt-10">No notifications yet 📭</div>
//       ) : (
//         <div className="space-y-3">
//           {notifications.map((notif) => (
//             <div key={notif._id} className="flex items-center justify-between bg-white shadow-sm border border-gray-100 rounded-2xl p-3 hover:bg-gray-50 transition">
//               <div className="flex items-center flex-1">
//                 <img src={notif.profilePic || "/default-avatar.png"} alt="sender" className="w-12 h-12 rounded-full object-cover border mr-3" />
//                 <div className="flex-1">
//                   <p className="text-sm text-gray-800">{notif.message}</p>
//                   <div className="flex items-center text-xs text-gray-400 mt-1">
//                     <Clock size={12} className="mr-1" />
//                     {new Date(notif.createdAt).toLocaleString()}
//                   </div>
//                 </div>

//                 {notif.type === "followRequest" && (
//                   <div className="flex space-x-2 ml-3">
//                     {notif.status === "pending" && (
//                       <>
//                         <button onClick={() => handleResponse(notif._id, "accept")} className="px-3 py-1 text-xs bg-green-500 text-white rounded-md hover:bg-green-600 transition">Accept</button>
//                         <button onClick={() => handleResponse(notif._id, "reject")} className="px-3 py-1 text-xs bg-red-500 text-white rounded-md hover:bg-red-600 transition">Reject</button>
//                       </>
//                     )}
//                     {notif.status === "accept" && (
//                       <button onClick={() => handleFollowBack(notif.senderId, notif._id)} className="px-3 py-1 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">Follow Back</button>
//                     )}
//                     {notif.status === "followed" && (
//                       <span className="px-3 py-1 text-xs bg-gray-300 text-gray-700 rounded-md">Following</span>
//                     )}
//                   </div>
//                 )}

//                 {!notif.isRead && <span className="bg-blue-500 h-2 w-2 rounded-full ml-2"></span>}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { Bell, Clock } from "lucide-react";
import instance from "../Components/axios";
import socket from "../AllInnerComponents/socket";

export default function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await instance.get("/profile/notifications", { withCredentials: true });
        const notifs = res.data.notifications.map(n => ({
          ...n,
          status: n.type === "followRequest" ? "pending" :
                  n.type === "followAccepted" ? "accept" : undefined
        }));
        setNotifications([...notifs].reverse());
      } catch (err) {
        console.error("Error fetching notifications:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  useEffect(() => {
    socket.on("receive-notification", (notif) => {
      setNotifications(prev => [ {
        ...notif,
        status: notif.type === "followRequest" ? "pending" :
                notif.type === "followAccepted" ? "accept" : undefined
      }, ...prev ]);
    });

    return () => socket.off("receive-notification");
  }, []);

  const handleResponse = async (notifId, action) => {
    try {
      await instance.post(`/profile/notifications/${notifId}/${action}`, {}, { withCredentials: true });
      setNotifications(prev =>
        prev.map(n => n._id === notifId ? { ...n, status: action, isRead: true } : n)
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleFollowBack = async (senderId, notifId) => {
    try {
      await instance.post(`/profile/followBack/${senderId}`, {}, { withCredentials: true });
      setNotifications(prev =>
        prev.map(n => n._id === notifId ? { ...n, status: "followed" } : n)
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleUnfollow = async (senderId, notifId) => {
    try {
      await instance.post(`/profile/unfollow/${senderId}`, {}, { withCredentials: true });
      setNotifications(prev =>
        prev.map(n => n._id === notifId ? { ...n, status: "accept" } : n)
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <Bell className="animate-ping text-gray-500" size={40} />
    </div>
  );

  return (
    <div className="max-w-md mx-auto mt-6 p-4">
      <h1 className="text-2xl font-bold mb-5 text-center">Notifications</h1>
      {notifications.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">No notifications yet 📭</div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notif) => (
            <div key={notif._id} className="flex items-center justify-between bg-white shadow-sm border border-gray-100 rounded-2xl p-3 hover:bg-gray-50 transition relative">
              <div className="flex items-center flex-1">
                <img src={notif.profilePic || "/default-avatar.png"} alt="sender" className="w-12 h-12 rounded-full object-cover border mr-3" />
                <div className="flex-1">
                  <p className="text-sm text-gray-800">{notif.message}</p>
                  <div className="flex items-center text-xs text-gray-400 mt-1">
                    <Clock size={12} className="mr-1" />
                    {new Date(notif.createdAt).toLocaleString()}
                  </div>
                </div>

                {notif.type === "followRequest" && (
                  <div className="flex space-x-2 ml-3 relative">
                    {notif.status === "pending" && (
                      <>
                        <button onClick={() => handleResponse(notif._id, "accept")} className="px-3 py-1 text-xs bg-green-500 text-white rounded-md hover:bg-green-600 transition">Accept</button>
                        <button onClick={() => handleResponse(notif._id, "reject")} className="px-3 py-1 text-xs bg-red-500 text-white rounded-md hover:bg-red-600 transition">Reject</button>
                      </>
                    )}

                    {notif.status === "accept" && (
                      <button onClick={() => handleFollowBack(notif.senderId, notif._id)} className="px-3 py-1 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">Follow Back</button>
                    )}

                    {notif.status === "followed" && (
                      <div className="relative group">
                        <span className="px-3 py-1 text-xs bg-gray-300 text-gray-700 rounded-md cursor-pointer">Following</span>
                        {/* Dropdown on hover */}
                        <div className="absolute top-full left-0 mt-1 w-24 bg-white border border-gray-200 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10">
                          <button 
                            onClick={() => handleUnfollow(notif.senderId, notif._id)} 
                            className="w-full text-left px-3 py-1 text-sm text-red-500 hover:bg-gray-100 rounded-md"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {!notif.isRead && <span className="bg-blue-500 h-2 w-2 rounded-full ml-2"></span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
