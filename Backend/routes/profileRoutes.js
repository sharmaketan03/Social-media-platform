import express from "express";
import { sendFollowRequest, acceptFollowRequest } from "../Controllers/followController.js";
import verifyToken from "../Middleware/jwtverify.js";
import UserAuth from "../Models/Profile.js";

const router = express.Router();

// ✅ Send / Accept follow
router.post("/sendfollowrequest", verifyToken, sendFollowRequest);
router.post("/acceptfollowrequest", verifyToken, acceptFollowRequest);

// ✅ Fetch all notifications
router.get("/notifications", verifyToken, async (req, res) => {
  const user = await UserAuth.findById(req.user.id);
  res.json({ notifications: user.notifications.reverse() });
});

// ✅ Mark all as read
router.put("/notifications/markAllRead", authMiddleware, async (req, res) => {
  const user = await UserAuth.findById(req.user.id);
  user.notifications.forEach((n) => (n.isRead = true));
  await user.save();
  res.json({ message: "All marked as read" });
});

export default router;
