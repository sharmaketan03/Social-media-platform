import UserAuth from "../Models/Profile.js";
import { getIO ,getOnlineUsers} from "../socket/socket.js";
console.log("getIO function:", getIO);
// export async function getAlldata(req, res) {
//   try {
//     const loginUserId = req.userId;

//     // Login user ka following + followRequests data
//     const loginUser = await UserAuth.findById(loginUserId)
//       .select("following followRequests");

//     let users = await UserAuth.find({ _id: { $ne: loginUserId } })
//       .select("_id username fullName profilePic isPrivate");

//     if (!users || users.length === 0) {
//       return res.status(404).json({ message: "No users found" });
//     }

//     let sentRequestIds = loginUser.followRequests.map(r => r.senderId.toString());
//     let followingIds = loginUser.following.map(id => id.toString());

//     const finalUsers = users.map(u => {
//       let status = "follow";

//       if (followingIds.includes(u._id.toString())) {
//         status = "following";
//       } else if (sentRequestIds.includes(u._id.toString())) {
//         status = "requested";
//       }

//       return {
//         _id: u._id,
//         username: u.username,
//         fullName: u.fullName,
//         profilePic: u.profilePic,
//         isPrivate: u.isPrivate,
//         status
//       };
//     });

//     res.status(200).json({
//       success: true,
//       count: finalUsers.length,
//       users: finalUsers,
//     });

//   } catch (err) {
//     console.error("Error fetching users:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// }

export async function getAlldata(req, res) {
  try {
    const loginUserId = req.userId;

    // Login user
    const loginUser = await UserAuth.findById(loginUserId)
      .select("following");

    // All users except login user
    let users = await UserAuth.find({ _id: { $ne: loginUserId } })
      .select("_id username fullName profilePic isPrivate followRequests");

    let followingIds = loginUser.following.map(id => id.toString());

    const finalUsers = users.map(u => {
      let status = "follow";

      // Already following
      if (followingIds.includes(u._id.toString())) {
        status = "following";
      }

      // Check if login user has sent request to THIS user
      const requestFound = u.followRequests.some(
        (req) => req.senderId.toString() === loginUserId
      );

      if (requestFound) {
        status = "requested";
      }

      return {
        _id: u._id,
        username: u.username,
        fullName: u.fullName,
        profilePic: u.profilePic,
        isPrivate: u.isPrivate,
        status
      };
    });

    res.status(200).json({
      success: true,
      count: finalUsers.length,
      users: finalUsers,
    });

  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}


export async function profileuser(req,res){
     try{
      //  console.log(req.userId)
       let user=await UserAuth.findById(req.userId).select("-password")
      res.json({user})

     }catch(err){
        res.status(500).json({message:"Internal server error"})
     }


}

export async function EditProfiles(req,res){
     try{
          let userId=req.userId
          let update=req.body


          let updateID=await UserAuth.findByIdAndUpdate(
            userId,
            { $set : update},
            { new : true}
          )

  res.status(200).json({message:"succefully updated", user:update})



     }catch(err){
        res.status(500).json({message:"Internal server error"})
     }
}

export async function updatepic(req, res) {
  try {
    // console.log("User ID:", req.userId);
    // console.log("Uploaded file:", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const updatedUser = await UserAuth.findByIdAndUpdate(
      req.userId,
      { $set: { profilePic: req.file.path } },
      { new: true }
    );

    res.status(200).json({
      message: "Successfully updated profile pic ✅",
      profilePic: updatedUser.profilePic,
    });
  } catch (err) {
    console.error("Profile pic update error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}



// controllers/followController.js











// export async function sendFollowRequest(req, res) {
//   console.log("sendFollowRequest controller reached", req.body);
//   const { receiverId } = req.body;
//   const loginUser = req.userId;

//   // console.log("Login User ID:", loginUser, "Receiver ID:", receiverId);

//   try {
//     const receiver = await UserAuth.findById(receiverId);
//     const sender = await UserAuth.findById(loginUser);

//     if (!receiver || !sender) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // ✅ Check if already requested
//     const alreadyRequested = receiver.followRequests.some(
//       (req) => req.senderId.toString() === loginUser.toString()
//     );
//     if (alreadyRequested) {
//       return res.status(400).json({ message: "Follow request already sent" });
//     }

//     // ✅ Push follow request
//     receiver.followRequests.push({
//       senderId: loginUser,
//       isRead: false,
//       createdAt: new Date(),
//     });

//     // ✅ Push notification
//     receiver.notifications.push({
//       senderId: loginUser,
//       receiverId,
//       type: "followRequest",
//       message: `${sender.username} sent you a follow request`,
//       profilePic: sender.profilePic,
//       isRead: false,
//       createdAt: new Date(),
//     });

//     await receiver.save();

//     res
//       .status(200)
//       .json({ message: "Follow request sent & notification created" });
//   } catch (err) {
//     console.error("Error in sendFollowRequest:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// }
// export async function sendFollowRequest(req, res) {
//   const { receiverId } = req.body;
//   const senderId = req.userId;

//   if (senderId === receiverId) {
//     return res.status(400).json({ message: "You cannot follow yourself!" });
//   }

//   const receiver = await UserAuth.findById(receiverId);
//   const sender = await UserAuth.findById(senderId);

//   // Already following?
//   if (sender.following.includes(receiverId)) {
//     return res.json({ message: "Already following" });
//   }

//   // Already sent request?
//   const alreadyRequested = receiver.followRequests.some(
//     (r) => r.senderId.toString() === senderId
//   );

//   if (alreadyRequested) {
//     return res.json({ message: "Request already sent" });
//   }

//   // If private account → request  
//   if (receiver.isPrivate) {
//     receiver.followRequests.push({
//       senderId,
//       createdAt: new Date(),
//     });

//     receiver.notifications.push({
//       senderId,
//       receiverId,
//       type: "followRequest",
//       message: `${sender.username} requested to follow you`,
//       profilePic: sender.profilePic,
//     });

//     await receiver.save();
//     return res.json({ message: "Request Sent" });
//   }

//   // Otherwise auto-follow
//   sender.following.push(receiverId);
//   receiver.followers.push(senderId);

//   await sender.save();
//   await receiver.save();

//   return res.json({ message: "Followed successfully" });
// }
// FOLLOW REQUEST
// FOLLOW REQUEST CONTROLLER
// export async function sendFollowRequest(req, res) {
//   try {
//     const senderId = req.userId;
//     const { receiverId } = req.body;

//     const sender = await UserAuth.findById(senderId).select("username profilePic");
//     const receiver = await UserAuth.findById(receiverId);

//     if (!sender || !receiver) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // 🟢 CONVERT TO BOOLEAN (important fix)
//     const isPrivate = receiver.isPrivate === true || receiver.isPrivate === "true";

//     console.log("Fixed PRIVATE VALUE:", isPrivate, typeof receiver.isPrivate);

//     // 🟢 PUBLIC ACCOUNT → Direct Follow
//     if (!isPrivate) {

//       // Already following?
//       if (receiver.followers.includes(senderId)) {
//         return res.json({ message: "Already following" });
//       }

//       receiver.followers.push(senderId);

//       receiver.notifications.push({
//         senderId,
//         receiverId,
//         type: "follow",
//         message: `${sender.username} started following you`,
//         profilePic: sender.profilePic,
//         createdAt: new Date()
//       });

//       await receiver.save();

//       return res.json({ message: "Followed successfully" });
//     }

//     // 🔵 PRIVATE ACCOUNT → Follow Request
//     const alreadyRequested = receiver.followRequests.some(
//       (req) => req.senderId.toString() === senderId.toString()
//     );
//     if (alreadyRequested) {
//       return res.json({ message: "Request already sent" });
//     }

//     receiver.followRequests.push({
//       senderId,
//       isRead: false,
//       createdAt: new Date()
//     });

//     receiver.notifications.push({
//       senderId,
//       receiverId,
//       type: "followRequest",
//       message: `${sender.username} sent you a follow request`,
//       profilePic: sender.profilePic,
//       createdAt: new Date()
//     });

//     await receiver.save();

//     return res.json({ message: "Follow request sent" });

//   } catch (error) {
//     console.log("Follow request error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// }


// export async function sendFollowRequest(req, res) {
//   try {
//     const senderId = req.userId;
//     const { receiverId } = req.body;

//     const sender = await UserAuth.findById(senderId).select("username profilePic");
//     const receiver = await UserAuth.findById(receiverId);

//     if (!sender || !receiver) return res.status(404).json({ message: "User not found" });

//     const isPrivate = receiver.isPrivate === true || receiver.isPrivate === "true";

//     if (!isPrivate) {
//       if (receiver.followers.includes(senderId)) return res.json({ message: "Already following" });

//       receiver.followers.push(senderId);

//       const notification = {
//         senderId,
//         receiverId,
//         type: "follow",
//         message: `${sender.username} started following you`,
//         profilePic: sender.profilePic,
//         createdAt: new Date()
//       };

//       receiver.notifications.push(notification);
//       await receiver.save();

//       // 🔵 SOCKET.IO EMIT
//       const io = getIO();
//       const onlineUsers = getOnlineUsers();
//       const socketId = onlineUsers[receiverId];
//       if (socketId) {
//         io.to(socketId).emit("receive-notification", notification);
//       }

//       return res.json({ message: "Followed successfully" });
//     }

//     // PRIVATE ACCOUNT → Follow Request
//     const alreadyRequested = receiver.followRequests.some(r => r.senderId.toString() === senderId);
//     if (alreadyRequested) return res.json({ message: "Request already sent" });

//     const notification = {
//       senderId,
//       receiverId,
//       type: "followRequest",
//       message: `${sender.username} sent you a follow request`,
//       profilePic: sender.profilePic,
//       createdAt: new Date()
//     };

//     receiver.followRequests.push({ senderId, isRead: false, createdAt: new Date() });
//     receiver.notifications.push(notification);
//     await receiver.save();

//     // 🔵 SOCKET.IO EMIT
//     const io = getIO();
//     const onlineUsers = getOnlineUsers();
//     const socketId = onlineUsers[receiverId];
//     if (socketId) {
//       io.to(socketId).emit("receive-notification", notification);
//     }

//     return res.json({ message: "Follow request sent" });
//   } catch (error) {
//     console.log("Follow request error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// }
export async function sendFollowRequest(req, res) {
  try {
    const senderId = req.userId;
    const { receiverId } = req.body;

    if (senderId === receiverId)
      return res.status(400).json({ message: "You cannot follow yourself!" });

    const sender = await UserAuth.findById(senderId).select("username profilePic following");
    const receiver = await UserAuth.findById(receiverId);

    if (!sender || !receiver) return res.status(404).json({ message: "User not found" });

    const isPrivate = receiver.isPrivate === true || receiver.isPrivate === "true";

    // ✅ PUBLIC ACCOUNT → Auto follow
    if (!isPrivate) {
      if (receiver.followers.includes(senderId)) return res.json({ message: "Already following" });

      // Receiver update
      receiver.followers.push(senderId);
      const notification = {
        senderId,
        receiverId,
        type: "follow",
        message: `${sender.username} started following you`,
        profilePic: sender.profilePic,
        createdAt: new Date()
      };
      receiver.notifications.push(notification);
      await receiver.save();

      // Sender update
      if (!sender.following.includes(receiverId)) {
        sender.following.push(receiverId);
        await sender.save();
      }

      // SOCKET.IO EMIT
      const io = getIO();
      const onlineUsers = getOnlineUsers();
      const socketId = onlineUsers[receiverId];
      if (socketId) io.to(socketId).emit("receive-notification", notification);

      return res.json({ message: "Followed successfully" });
    }

    // 🔵 PRIVATE ACCOUNT → Follow Request
    const alreadyRequested = receiver.followRequests.some(r => r.senderId.toString() === senderId);
    if (alreadyRequested) return res.json({ message: "Request already sent" });

    const notification = {
      senderId,
      receiverId,
      type: "followRequest",
      message: `${sender.username} sent you a follow request`,
      profilePic: sender.profilePic,
      createdAt: new Date()
    };

    receiver.followRequests.push({ senderId, isRead: false, createdAt: new Date() });
    receiver.notifications.push(notification);
    await receiver.save();

    // SOCKET.IO EMIT
    const io = getIO();
    const onlineUsers = getOnlineUsers();
    const socketId = onlineUsers[receiverId];
    if (socketId) io.to(socketId).emit("receive-notification", notification);

    return res.json({ message: "Follow request sent" });

  } catch (error) {
    console.log("Follow request error:", error);
    res.status(500).json({ message: "Server error" });
  }
}










export const getNotifications = async (req, res) => {
  const user = await UserAuth.findById(req.userId).select("notifications");

  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({ notifications: user.notifications });
};



export async function getAllFollowData(req, res) {
  try {
    const loginUserId = req.userId;
    console.log("getAllFollowData controller reached", loginUserId);

    // 1️⃣ Login user ka data lao
    const user = await UserAuth.findById(loginUserId)
      .select("followers following followRequests");

    // 2️⃣ Jinko user ne request bheji hai (Sent Requests)
    const usersWithSentRequests = await UserAuth.find({
      "followRequests.senderId": loginUserId,
    }).select("_id username profilePic");

    const sentRequestIds = usersWithSentRequests.map(
      (u) => u._id.toString()
    );

    console.log("Followers:", user.followers);
    console.log("Following:", user.following);
    console.log("Follow Requests (received):", user.followRequests);
    console.log("Sent Requests IDs:", sentRequestIds);

    // 3️⃣ Final Response
    res.status(200).json({
      followers: user.followers,
      following: user.following,
      followRequests: user.followRequests,   // received requests
      sentRequests: sentRequestIds           // sent requests
    });

  } catch (error) {
    console.error("Error in getAllFollowData:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


// export async function requestNotificationResponse(req, res) {
//   try {
//     const { notifId, action } = req.params;
//     const userId = req.userId;

//     console.log("Notification response controller reached", { notifId, action, userId });

//     // 1️⃣ Find the user containing this notification
//     const notifI = await UserAuth.findOne({ "notifications._id": notifId });
//     console.log("Fetched notification:", notifI);

//     if (!notifI) {
//       return res.status(404).json({ message: "Notification not found" });
//     }

//     // 2️⃣ Get the specific notification
//     const notif = notifI.notifications.id(notifId);
//     console.log("Specific notification:", notif);

//     if (notif.type !== "followRequest") {
//       return res.status(400).json({ message: "Invalid notification type" });
//     }

//     const senderId = notif.senderId; // ✅ define senderId

//     // 3️⃣ Accept action
//     if (action === "accept") {
//       await UserAuth.findByIdAndUpdate(userId, {
//         $addToSet: { followers: senderId },          // sender ko loginUser ke followers me add
//         $pull: { followRequests: { senderId: senderId } },  // remove follow request
//         $set: { "notifications.$[elem].isRead": true }      // mark notification read
//       }, { arrayFilters: [{ "elem._id": notifId }] });



//   await UserAuth.findByIdAndUpdate(senderId, {
//     $push: {
//       notifications: {
//         senderId: userId,       // jo user accept kiya
//         receiverId: senderId,
//         type: "followAccepted",
//         message: `${notifI.fullName} accepted your follow request`,
//         profilePic: notifI.profilePic,
//         createdAt: new Date()
//       }
//     }
//   });


//       // Add loginUser to sender's following
//       await UserAuth.findByIdAndUpdate(senderId, {
//         $addToSet: { following: userId }
//       });

//       return res.json({ message: "Follow request accepted" });
//     }

//     // 4️⃣ Reject action
//     if (action === "reject") {
//       await UserAuth.findByIdAndUpdate(userId, {
//         $pull: { followRequests: { senderId: senderId }, notifications: { _id: notifId } }
//       });

//       return res.json({ message: "Follow request rejected" });
//     }

//     return res.status(400).json({ message: "Invalid action type" });

//   } catch (err) {
//     console.error("Error in requestNotificationResponse:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// }

// export async function requestNotificationResponse(req, res) {
//   try {
//     const { notifId, action } = req.params;
//     const userId = req.userId;

//     const user = await UserAuth.findOne({ "notifications._id": notifId });
//     if (!user) return res.status(404).json({ message: "Notification not found" });

//     const notif = user.notifications.id(notifId);
//     const senderId = notif.senderId;

//     if (notif.type !== "followRequest")
//       return res.status(400).json({ message: "Invalid notification type" });

//     // ACCEPT
//     if (action === "accept") {
//       await UserAuth.findByIdAndUpdate(userId, {
//         $addToSet: { followers: senderId },
//         $pull: { followRequests: { senderId } },
//         $set: { "notifications.$[e].isRead": true }
//       }, { arrayFilters: [{ "e._id": notifId }] });

//       // Sender gets "accepted" notification
//       await UserAuth.findByIdAndUpdate(senderId, {
//         $push: {
//           notifications: {
//             senderId: userId,
//             receiverId: senderId,
//             type: "followAccepted",
//             message: `${user.fullName} accepted your follow request`,
//             profilePic: user.profilePic,
//             createdAt: new Date(),
//           }
//         }
//       });

//       await UserAuth.findByIdAndUpdate(senderId, {
//         $addToSet: { following: userId }
//       });

//       return res.json({ message: "Follow request accepted" });
//     }

//     // REJECT
//     if (action === "reject") {
//       await UserAuth.findByIdAndUpdate(userId, {
//         $pull: {
//           followRequests: { senderId },
//           notifications: { _id: notifId }
//         }
//       });

//       return res.json({ message: "Follow request rejected" });
//     }

//     return res.status(400).json({ message: "Invalid action" });

//   } catch (err) {
//     console.log("Notification error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// }

export async function requestNotificationResponse(req, res) {
  try {
    const { notifId, action } = req.params;
    const userId = req.userId;

    const user = await UserAuth.findOne({ "notifications._id": notifId });
    if (!user) return res.status(404).json({ message: "Notification not found" });

    const notif = user.notifications.id(notifId);
    const senderId = notif.senderId;

    if (notif.type !== "followRequest")
      return res.status(400).json({ message: "Invalid notification type" });

    // ACCEPT
    if (action === "accept") {
      await UserAuth.findByIdAndUpdate(userId, {
        $addToSet: { followers: senderId },
        $pull: { followRequests: { senderId } },
        $set: { "notifications.$[e].isRead": true }
      }, { arrayFilters: [{ "e._id": notifId }] });

      // Sender update
      await UserAuth.findByIdAndUpdate(senderId, {
        $addToSet: { following: userId },
        $push: {
          notifications: {
            senderId: userId,
            receiverId: senderId,
            type: "followAccepted",
            message: `${user.fullName} accepted your follow request`,
            profilePic: user.profilePic,
            createdAt: new Date()
          }
        }
      });

      return res.json({ message: "Follow request accepted" });
    }

    // REJECT
    if (action === "reject") {
      await UserAuth.findByIdAndUpdate(userId, {
        $pull: {
          followRequests: { senderId },
          notifications: { _id: notifId }
        }
      });
      return res.json({ message: "Follow request rejected" });
    }

    return res.status(400).json({ message: "Invalid action" });

  } catch (err) {
    console.log("Notification error:", err);
    res.status(500).json({ message: "Server error" });
  }
}


// export async function followback(req, res) {
//   try {
//     const userId = req.userId;
//     const { senderId } = req.params;

//     await UserAuth.findByIdAndUpdate(userId, {
//       $addToSet: { following: senderId }
//     });

//     await UserAuth.findByIdAndUpdate(senderId, {
//       $addToSet: { followers: userId }
//     });

//     return res.json({ message: "Followed back successfully" });
//   } catch (err) {
//     console.log("Follow back error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// }

export async function followback(req, res) {
  try {
    const userId = req.userId;
    const { senderId } = req.params;

    await UserAuth.findByIdAndUpdate(userId, { $addToSet: { following: senderId } });
    await UserAuth.findByIdAndUpdate(senderId, { $addToSet: { followers: userId } });

    return res.json({ message: "Followed back successfully" });
  } catch (err) {
    console.log("Follow back error:", err);
    res.status(500).json({ message: "Server error" });
  }
}
