// socket.js
let io; // module-level variable
let onlineUsers = {};

export function getIO() {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
}

export function getOnlineUsers() {
  return onlineUsers;
}

export default function socketConnection(server) {
  io = server; // assign io instance globally

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("add-user", (userId) => {
      onlineUsers[userId] = socket.id;
      console.log("Online Users:", onlineUsers);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);

      // Remove from online users
      for (let user in onlineUsers) {
        if (onlineUsers[user] === socket.id) {
          delete onlineUsers[user];
        }
      }
    });
  });
}
