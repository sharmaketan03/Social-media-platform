 
 import bcrypt from "bcryptjs";
import UserAuth from "../Models/Profile.js";
import jwt from "jsonwebtoken"

export const registerUser = async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;
    console.log(fullName, username, email, password)

    // Validation
    if (!fullName || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await UserAuth.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email or Username already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await UserAuth.create({
      fullName,
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully ",
      user: {
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email,password)
  
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    
    const user = await UserAuth.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

   
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

   
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    
    res.cookie("token", token, {
  httpOnly: true,
  secure: false,          
  sameSite: "lax",        
  maxAge: 7 * 24 * 60 * 60 * 1000, 
});


   
    res.status(200).json({
      message: "Login successful ",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const checkAuth = async (req, res) => {
  try {
    // verifyToken middleware already runs before this
    res.status(200).json({
      message: "User is authenticated ",
      user: req.user, // contains id and email (from token)
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
