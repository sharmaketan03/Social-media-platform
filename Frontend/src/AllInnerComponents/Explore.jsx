// import React, { useState, useMemo, useEffect, useContext } from "react";
// import instance from "../Components/axios";
// import { Search, Users } from "lucide-react";
// import { MyContext } from "../Components/UseContext";

// export default function Explore() {
//   const [users, setUsers] = useState([]);
//   const [allUsers, setAllUsers] = useState([]);
//   const [query, setQuery] = useState("");
//   const [count, setCount] = useState(12);
//   const [loading, setLoading] = useState(true);
//   const [disabledIds, setDisabledIds] = useState([]);

//   const { userId } = useContext(MyContext);
//   console.log("userId Explore page:", userId);

//   // Fetch all users
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await instance.get("/profile/getAllUser", {
//           withCredentials: true,
//         });
//         const updated = res.data.users.map((u) => ({
//           ...u,
//           followed: false,
//         }));
//         setAllUsers(updated);
//         setUsers(updated.slice(0, 12));
//       } catch (err) {
//         console.log("Fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUsers();
//   }, []);

//   // Fetch sent follow requests to disable buttons
//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         const res = await instance.get("/profile/getSentFollowRequests", {
//           withCredentials: true,
//         });
//         console.log("Sent follow requests:", res.data);
//         setDisabledIds(res.data.sentIds || []);
//       } catch (err) {
//         console.log("Error fetching follow requests:", err);
//       }
//     };
//     fetchRequests();
//   }, []);

//   // Filtered users (search)
//   const filtered = useMemo(() => {
//     const q = query.toLowerCase();
//     return users.filter(
//       (u) =>
//         u.username.toLowerCase().includes(q) ||
//         u.fullName.toLowerCase().includes(q)
//     );
//   }, [query, users]);

//   // Follow toggle handler
//   async function toggleFollow(id) {
//     setDisabledIds((prev) => [...prev, id]);
//     setUsers((prev) =>
//       prev.map((u) => (u._id === id ? { ...u, followed: true } : u))
//     );

//     try {
//       const res = await instance.post(
//         "/profile/followrequest",
//         { receiverId: id },
//         { withCredentials: true }
//       );
//       console.log("Follow request sent:", res.data);
//     } catch (err) {
//       console.log("Error sending follow request:", err);
//     }
//   }

//   // Load more users
//   function loadMore() {
//     const next = Math.min(allUsers.length, count + 12);
//     setUsers(allUsers.slice(0, next));
//     setCount(next);
//   }

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen text-gray-500 text-lg">
//         Loading users...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-8">
//       <div className="mx-auto max-w-6xl">
//         {/* Header */}
//         <header className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
//           <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
//             <Users size={26} className="text-purple-600" /> Discover People
//           </h1>

//           <div className="relative w-full sm:w-80">
//             <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
//             <input
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               placeholder="Search usernames or names..."
//               className="w-full pl-9 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm transition"
//             />
//           </div>
//         </header>

//         {/* Users Grid */}
//         <main>
//           {filtered.length === 0 ? (
//             <div className="text-center text-gray-500 mt-20 text-sm">
//               No users found 😔
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {filtered.map((u) => (
//                 <article
//                   key={u._id}
//                   className="group bg-white p-5 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow hover:-translate-y-1 border border-transparent hover:border-purple-200 duration-300"
//                 >
//                   {/* Profile Image */}
//                   <div className="relative flex justify-center mb-3">
//                     <img
//                       src={
//                         u.profilePic ||
//                         `https://ui-avatars.com/api/?name=${encodeURIComponent(
//                           u.username
//                         )}&background=random&rounded=true`
//                       }
//                       alt={u.username}
//                       className="w-20 h-20 rounded-full object-cover border-4 border-purple-200 group-hover:border-purple-400 transition"
//                     />
//                   </div>

//                   {/* User Info */}
//                   <div className="text-center">
//                     <h3 className="font-semibold text-gray-800">{u.username}</h3>
//                     <p className="text-sm text-gray-500">{u.fullName}</p>
//                     <p className="mt-2 text-xs text-gray-500 italic">
//                       {u.bio || "No bio available"}
//                     </p>

//                     {/* Follow Button */}
//                     <button
//                       onClick={() => toggleFollow(u._id)}
//                       disabled={disabledIds.includes(u._id)}
//                       className={`mt-4 w-full py-1.5 rounded-full text-sm font-medium transition-all ${
//                         disabledIds.includes(u._id)
//                           ? "border border-gray-300 text-gray-700 bg-white opacity-70 cursor-not-allowed"
//                           : "bg-gradient-to-r from-purple-600 to-indigo-500 text-white hover:opacity-90"
//                       }`}
//                     >
//                       {disabledIds.includes(u._id) ? "Request Sent" : "Follow"}
//                     </button>
//                   </div>
//                 </article>
//               ))}
//             </div>
//           )}
//         </main>

//         {/* Load More */}
//         <div className="mt-10 flex justify-center">
//           {users.length < allUsers.length ? (
//             <button
//               onClick={loadMore}
//               className="px-6 py-2.5 rounded-full bg-white border border-gray-300 hover:bg-gray-100 shadow-md transition text-sm font-medium"
//             >
//               Load More
//             </button>
//           ) : (
//             <div className="text-sm text-gray-400">No more users 🚀</div>
//           )}
//         </div>

//         <footer className="mt-10 text-center text-xs text-gray-400">
//           Discover People • Powered by your backend 💜
//         </footer>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import instance from "../Components/axios";

function Explore() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch explore users
  const getExploreUsers = async () => {
    try {
      const res = await instance.get("/profile/getAllUser", {
        withCredentials: true,
      });

      setUsers(res.data.users);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching explore users:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getExploreUsers();
  }, []);

  // Follow Request / Follow API logic
  const handleFollow = async (userId, index) => {
    try {
      const res = await instance.post(
        "/profile/followrequest",
        { receiverId: userId },
        { withCredentials: true }
      );

      let updated = [...users];

      // Public user → direct follow
      if (res.data.message.includes("Followed successfully")) {
        updated[index].status = "following";
      }
      // Private user → request sent
      else {
        updated[index].status = "requested";
      }

      setUsers(updated);
    } catch (error) {
      console.log("Follow error:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Explore</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((u, index) => (
            <div
              key={u._id}
              className="flex items-center justify-between shadow p-3 rounded-md bg-white"
            >
              {/* Left: Profile Info */}
              <div className="flex items-center gap-3">
                <img
                  src={
                    u.profilePic ||
                    `https://ui-avatars.com/api/?name=${u.username}&background=random&rounded=true`
                  }
                  alt="profile"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{u.username}</p>
                  <p className="text-sm text-gray-500">{u.fullName}</p>
                </div>
              </div>

              {/* Right: Button */}
              {u.status === "follow" && (
                <button
                  onClick={() => handleFollow(u._id, index)}
                  className="px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Follow
                </button>
              )}

              {u.status === "requested" && (
                <button
                  disabled
                  className="px-4 py-1 bg-gray-200 text-gray-700 rounded-lg cursor-not-allowed border"
                >
                  Requested
                </button>
              )}

              {u.status === "following" && (
                <button
                  disabled
                  className="px-4 py-1 bg-green-500 text-white rounded-lg cursor-default"
                >
                  Following
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Explore;
