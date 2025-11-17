import UserAuth from "../Models/Profile.js";

export async function accountsettings(req, res) {
  console.log("Account settings update requested by:", req.userId);
  try {
    const { accountType } = req.body;
    let user = await UserAuth.findById(req.userId);
    console.log("Cureent user account type:", user);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    console.log("Updating account type to:", accountType);
    let value = accountType.toLowerCase() == "private";
    console.log("Boolean value to be set:", value);

    user.isPrivate = value;
    await user.save();
    res.status(200).json({ message: "Account settings updated successfully" });
  } catch (err) {
    console.log("Account settings error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function chatUsersList(req, res) {
  console.log("Chat users list requested by:", req.userId);
}
