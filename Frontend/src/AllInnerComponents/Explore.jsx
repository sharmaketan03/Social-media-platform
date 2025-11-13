import React, { useState, useMemo, useEffect, useContext } from "react";
import instance from "../Components/axios";
import { Search, Users } from "lucide-react";
import { MyContext } from "../Components/UseContext";


export default function Explore() {
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [count, setCount] = useState(12);
  const [loading, setLoading] = useState(true);
  const [disabledIds, setDisabledIds] = useState([]); 

  const { userId } = useContext(MyContext);
  console.log("userId Explore page:", userId);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await instance.get("/profile/getAllUser", {
          withCredentials: true,
        });
        console.log(res);
        const updated = res.data.users.map((u) => ({
          ...u,
          followed: false,
        }));
        setAllUsers(updated);
        setUsers(updated.slice(0, 12));
        setLoading(false);
      } catch (err) {
        console.log("Fetch error:", err);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Filtered users (search)
  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return users.filter(
      (u) =>
        u.username.toLowerCase().includes(q) ||
        u.fullName.toLowerCase().includes(q)
    );
  }, [query, users]);

  // Follow toggle handler
 async function toggleFollow(id) {
    const senderId = userId;
    const receiverId = id;

    console.log("senderID:", senderId, "receiverId:", receiverId);

    // Disable the button immediately
    setDisabledIds((prev) => [...prev, id]);

    // Update UI instantly
    setUsers((prev) =>
      prev.map((u) => (u._id === id ? { ...u, followed: !u.followed } : u))
    );

    try{
         let res =await instance.post("/profile/followrequest",{receiverId},{withCredentials:true})
          console.log("follow request sent",res)  

    }catch(err){
      console.log("error follow sending",err)
    }
   
    

    // Listen for ack or error
   
     
  }

  // Load more users
  function loadMore() {
    const next = Math.min(allUsers.length, count + 12);
    setUsers(allUsers.slice(0, next));
    setCount(next);
  }

  // Loading UI
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-lg">
        Loading users...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <Users size={26} className="text-purple-600" /> Discover People
          </h1>

          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search usernames or names..."
              className="w-full pl-9 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm transition"
            />
          </div>
        </header>

        {/* Users Grid */}
        <main>
          {filtered.length === 0 ? (
            <div className="text-center text-gray-500 mt-20 text-sm">
              No users found 😔
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filtered.map((u) => (
                <article
                  key={u._id}
                  className="group bg-white p-5 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow hover:-translate-y-1 border border-transparent hover:border-purple-200 duration-300"
                >
                  {/* Profile Image */}
                  <div className="relative flex justify-center mb-3">
                    <img
                      src={
                        u.profilePic ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          u.username
                        )}&background=random&rounded=true`
                      }
                      alt={u.username}
                      className="w-20 h-20 rounded-full object-cover border-4 border-purple-200 group-hover:border-purple-400 transition"
                    />
                  </div>

                  {/* User Info */}
                  <div className="text-center">
                    <h3 className="font-semibold text-gray-800">{u.username}</h3>
                    <p className="text-sm text-gray-500">{u.fullName}</p>

                    <p className="mt-2 text-xs text-gray-500 line-clamp-2 italic">
                      {u.bio || "No bio available"}
                    </p>

                    {/* Follow Button */}
                    <button
                      onClick={() => toggleFollow(u._id)}
                      disabled={disabledIds.includes(u._id)}
                      className={`mt-4 w-full py-1.5 rounded-full text-sm font-medium transition-all ${
                        u.followed
                          ? "border border-gray-300 text-gray-700 bg-white hover:bg-gray-100"
                          : "bg-gradient-to-r from-purple-600 to-indigo-500 text-white hover:opacity-90"
                      } ${disabledIds.includes(u._id) ? "opacity-60 cursor-not-allowed" : ""}`}
                    >
                      {disabledIds.includes(u._id)
                        ? "Sent..."
                        : u.followed
                        ? "Request Sent"
                        : "Follow"}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </main>

        {/* Load More */}
        <div className="mt-10 flex justify-center">
          {users.length < allUsers.length ? (
            <button
              onClick={loadMore}
              className="px-6 py-2.5 rounded-full bg-white border border-gray-300 hover:bg-gray-100 shadow-md transition text-sm font-medium"
            >
              Load More
            </button>
          ) : (
            <div className="text-sm text-gray-400">No more users 🚀</div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-10 text-center text-xs text-gray-400">
          Discover People • Powered by your backend 💜
        </footer>
      </div>
    </div>
  );
}
