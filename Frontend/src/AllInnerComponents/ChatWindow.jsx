import { useState, useEffect, useRef } from "react";

export default function ChatWindow({ chatUser, loginUserId, socket }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll to bottom jab messages update ho
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch previous messages for this chat
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/messages/${chatUser._id}`, {
          credentials: "include",
        });
        const data = await res.json();
        setMessages(data.messages || []);
      } catch (err) {
        console.error(err);
      }
    };

    if (chatUser?._id) fetchMessages();
  }, [chatUser]);

  // Listen to new messages via socket
  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (msg) => {
      if (msg.senderId === chatUser._id || msg.senderId === loginUserId) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    socket.on("receive-message", handleReceiveMessage);

    return () => {
      socket.off("receive-message", handleReceiveMessage);
    };
  }, [socket, chatUser, loginUserId]);

  // Send message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const msgObj = {
      senderId: loginUserId,
      receiverId: chatUser._id,
      text: newMessage.trim(),
      createdAt: new Date(),
    };

    // Emit via socket
    socket.emit("send-message", msgObj);

    // Update local state
    setMessages((prev) => [...prev, msgObj]);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="p-4 border-b flex items-center gap-3 bg-white">
        <img
          src={chatUser.profilePic || "/default-avatar.png"}
          alt={chatUser.username}
          className="w-10 h-10 rounded-full object-cover"
        />
        <h2 className="font-semibold">{chatUser.username}</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-100 space-y-2">
        {messages.length === 0 && (
          <p className="text-gray-400 text-center mt-10">No messages yet</p>
        )}
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.senderId === loginUserId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-2 rounded-lg max-w-xs break-words ${
                msg.senderId === loginUserId
                  ? "bg-purple-500 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              {msg.text}
              <div className="text-[10px] mt-1 text-gray-400 text-right">
                {new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input Box */}
      <form
        onSubmit={handleSendMessage}
        className="p-4 border-t flex gap-2 bg-white"
      >
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-600 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
}
