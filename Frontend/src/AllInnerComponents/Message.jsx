import { useState, useEffect } from "react";
import instance from "../Components/axios";
import ChatWindow from "./ChatWindow";
import socket from "../AllInnerComponents/socket";

export default function MessagesPage() {
  const [chatUsers, setChatUsers] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  const loginUserId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await instance.get("/profile/chatUsers", { withCredentials: true });
        setChatUsers(res.data.users);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="flex h-screen">
      {/* Left: Users list */}
      <div className="w-80 border-r overflow-y-auto p-4 bg-gray-50">
        <h2 className="font-bold mb-4">Chats</h2>
        {chatUsers.length === 0 ? (
          <p className="text-gray-500">No users to chat yet</p>
        ) : (
          chatUsers.map((user) => (
            <div
              key={user._id}
              onClick={() => setActiveChat(user)}
              className={`cursor-pointer flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 transition ${
                activeChat?._id === user._id ? "bg-gray-200 font-semibold" : ""
              }`}
            >
              <img
                src={user.profilePic || "/default-avatar.png"}
                alt={user.username}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span>{user.username}</span>
            </div>
          ))
        )}
      </div>

      {/* Right: Chat Window */}
      <div className="flex-1">
        {activeChat ? (
          <ChatWindow chatUser={activeChat} loginUserId={loginUserId} socket={socket} />
        ) : (
          <div className="flex justify-center items-center h-full text-gray-400">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
}
