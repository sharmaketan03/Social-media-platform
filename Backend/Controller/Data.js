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
