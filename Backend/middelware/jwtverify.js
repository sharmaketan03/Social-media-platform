import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token; // token cookie se lo

    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }

    // Token verify karo
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // decoded me user ka id aata hai
    req.userId = decoded.id; // ye id login ke time encode ki gayi thi
    next();
  } catch (err) {
    console.error("Token verify error:", err);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
