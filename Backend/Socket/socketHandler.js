import UserAuth from "../Models/Profile.js";

export async function socketHandler(io) {
  console.log("🟣 socketHandler attached");

  // Online users map: userId -> socketId
  const onlineUsers = {};

  io.on("connection", (socket) => {
    console.log("✅ Connected:", socket.id);

    // Jab user apna userId register kare
    socket.on("register", (userId) => {
      onlineUsers[userId] = socket.id;
      console.log("🟢 Online Users:", onlineUsers);
    });

    // Follow request send
    socket.on("send follow-request", async (data) => {
      const { senderId, reciverId } = data;
      console.log("Follow request data:", senderId, reciverId);

      // DB update: add senderId in receiver's followRequests array
      await UserAuth.findByIdAndUpdate(reciverId, {
        $push: { followRequests: senderId }
      });

      // Check if receiver is online
      const reciverSocketId = onlineUsers[reciverId];
      if (reciverSocketId) {
        io.to(reciverSocketId).emit("receive_follow_request", {
          senderId,
          message: `${senderId} sent you a follow request.`
        });
        console.log("🟢 Notification sent to:", reciverId);
      } else {
        console.log("⚪ Receiver is offline, notification saved in DB.");
      }
    });

    // User disconnect
    socket.on("disconnect", () => {
      for (let userId in onlineUsers) {
        if (onlineUsers[userId] === socket.id) {
          delete onlineUsers[userId];
          console.log(`🔴 User ${userId} disconnected`);
          break;
        }
      }
    });
  });
}


