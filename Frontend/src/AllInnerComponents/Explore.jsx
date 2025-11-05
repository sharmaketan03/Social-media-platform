import React, { useState, useMemo, useEffect } from "react";
import instance from "../Components/axios"
export default function Explore() {
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [count, setCount] = useState(12);


  // ✅ fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await instance.get("/profile/getAllUser",{withCredentials:true}); 
        console.log(res)
        const updated = data.map((u) => ({
          ...u,
          followed: false,
        }));

        setAllUsers(updated);
        setUsers(updated.slice(0, 12));
      } catch (err) {
        console.log("Fetch error:", err);
      }
    };

    fetchUsers();
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return users.filter(
      (u) =>
        u.username.toLowerCase().includes(q) ||
        u.fullName.toLowerCase().includes(q)
    );
  }, [query, users]);

  function toggleFollow(id) {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, followed: !u.followed } : u))
    );
  }

  // function followAll() {
  //   setUsers((prev) => prev.map((u) => ({ ...u, followed: true })));
  // }

  // function unfollowAll() {
  //   setUsers((prev) => prev.map((u) => ({ ...u, followed: false })));
  // }

  function loadMore() {
    const next = Math.min(allUsers.length, count + 12);
    setUsers(allUsers.slice(0, next));
    setCount(next);
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-5xl">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Discover People</h1>

          <div className="flex gap-2">
            {/* <button
              onClick={followAll}
              className="px-3 py-1.5 rounded-lg bg-pink-500 text-white text-sm shadow"
            >
              Follow all
            </button> */}
            {/* <button
              onClick={unfollowAll}
              className="px-3 py-1.5 rounded-lg border text-sm"
            >
              Unfollow all
            </button> */}
          </div>
        </header>

        <div className="mb-4 flex gap-3 items-center">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search usernames or names"
            className="flex-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring"
          />
          <div className="text-sm text-slate-600">
            Showing {filtered.length} / {users.length}
          </div>
        </div>

        <main>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((u) => (
              <article
                key={u.id}
                className="bg-white p-4 rounded-2xl shadow-sm flex items-start gap-3"
              >
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    u.username
                  )}&background=ddd&rounded=true&size=64`}
                  alt={u.username}
                  className="w-14 h-14 rounded-full flex-shrink-0"
                />

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{u.username}</div>
                      <div className="text-xs text-slate-500">{u.fullName}</div>
                    </div>
                    <button
                      onClick={() => toggleFollow(u.id)}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        u.followed ? "border" : "bg-blue-600 text-white"
                      }`}
                    >
                      {u.followed ? "Following" : "Follow"}
                    </button>
                  </div>

                  <p className="mt-2 text-xs text-slate-600 line-clamp-2">
                    {u.bio}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            {users.length < allUsers.length ? (
              <button onClick={loadMore} className="px-4 py-2 rounded-lg border">
                Load more
              </button>
            ) : (
              <div className="text-sm text-slate-500">No more users</div>
            )}
          </div>
        </main>

        <footer className="mt-10 text-center text-xs text-slate-500">
          Fetched from backend ✅
        </footer>
      </div>
    </div>
  );
}
