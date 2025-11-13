import UserAuth from "../Models/Profile.js";

export async function getAlldata(req, res) {
  try {
    // console.log(req.userId)
    let users = await UserAuth.find(); 
     
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
// console.log("users:::_",users)
     users=users.filter(item=>item._id.toString()!==req.userId.toString())
    // console.log(users)
    res.status(200).json({
      success: true,
      count: users.length,
      users: users,
     
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}


export async function profileuser(req,res){
     try{
       console.log(req.userId)
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
    console.log("User ID:", req.userId);
    console.log("Uploaded file:", req.file);

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











export async function sendFollowRequest(req, res) {
  console.log("sendFollowRequest controller reached", req.body);
  const { receiverId } = req.body;
  const loginUser = req.userId;

  console.log("Login User ID:", loginUser, "Receiver ID:", receiverId);

  try {
    const receiver = await UserAuth.findById(receiverId);
    const sender = await UserAuth.findById(loginUser);

    if (!receiver || !sender) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Check if already requested
    const alreadyRequested = receiver.followRequests.some(
      (req) => req.senderId.toString() === loginUser.toString()
    );
    if (alreadyRequested) {
      return res.status(400).json({ message: "Follow request already sent" });
    }

    // ✅ Push follow request
    receiver.followRequests.push({
      senderId: loginUser,
      isRead: false,
      createdAt: new Date(),
    });

    // ✅ Push notification
    receiver.notifications.push({
      senderId: loginUser,
      receiverId,
      type: "followRequest",
      message: `${sender.username} sent you a follow request`,
      profilePic: sender.profilePic,
      isRead: false,
      createdAt: new Date(),
    });

    await receiver.save();

    res
      .status(200)
      .json({ message: "Follow request sent & notification created" });
  } catch (err) {
    console.error("Error in sendFollowRequest:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}



export async function getNotifications(req, res) {
  try {
    const userId = req.userId;

    // 🔹 Step 1: Fetch only 'notifications' field (no need for full user data)
    const user = await UserAuth.findById(userId)
      .select("notifications")
     

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
   console.log("User notifications fetched:", user);
    // 🔹 Step 2: Return all notifications sorted (latest first)
    const notifications = [...user.notifications].reverse();
     console.log("Fetched notifications:", notifications);
    res.status(200).json({ notifications });
  } catch (err) {
    console.error("Error fetching notifications:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}


export async function getSentFollowRequestss(req, res) {
  try {
    console.log("getSentFollowRequests controller reached", req.userId);

    const loginUserId = req.userId;

    // 🔍 sab users me se wo filter karo jinke followRequests me ye userId mila
    const usersWithRequest = await UserAuth.find({
      "followRequests.senderId": loginUserId
    }).select("_id username profilePic");

    // sirf IDs ka array bna lo
    const sentIds = usersWithRequest.map((user) => user._id.toString());

    console.log("Users jinko request bheji gayi:", sentIds);

    res.status(200).json({ sentIds });
  } catch (err) {
    console.error("Error fetching sent requests:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}