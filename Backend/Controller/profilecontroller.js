 
 import bcrypt from "bcryptjs";
import UserAuth from "../Models/Profile.js";
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"

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
}





const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
     user: "ketan301024@gmail.com",
        pass: "wazf xyqj axlh mtyc",
  },
});

export const DateOFBirth = async (req, res) => {
  try {
    const { userId, dob } = req.body;

    if (!dob) {
      return res.status(400).json({ message: "DOB is required" });
    }

    const formattedDOB = new Date(dob);

    const updatedUser = await UserAuth.findByIdAndUpdate(
      userId,
      { dob: formattedDOB },
      { new: true, runValidators: false }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    updatedUser.otp = otp;
    updatedUser.otpExpire = Date.now() + 5 * 60 * 1000;
    await updatedUser.save({ validateBeforeSave: false });

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: updatedUser.email,
        subject: "Email Verification Code",
        html: `<h2>Your OTP Code</h2><p style="font-size:20px;font-weight:bold">${otp}</p>`,
      });
    } catch (mailErr) {
      console.log("Email send fail but continue:", mailErr);
      // Continue without throwing error
    }

    return res.status(200).json({
      success: true,
      message: "DOB updated & OTP sent (or saved)",
      userId: updatedUser._id,
    });

  } catch (error) {
    console.log("DOB update error:", error);
    return res.status(500).json({ message: error.message });
  }
};





export async function emailverify(req, res) {
  try {
    const { email, otp } = req.body;
    console.log(email,otp)
    if (!email || !otp) {
      return res.status(400).json({ message: "Email & OTP required" });
    }

    const user = await UserAuth.findOne({ email });
    console.log(user)
    if (!user) return res.status(400).json({ message: "Invalid Email" });
    console.log(user.otp)
    if (toString(user.otp) !==toString( otp)) {
      return res.status(400).json({ message: "Invalid OTP ❌" });
    }

    if (user.otpExpire < Date.now()) {
      return res.status(400).json({ message: "OTP Expired ❌" });
    }

    // ✅ OTP success
    user.otp = null;
    user.otpExpire = null;
    await user.save();

    return res.status(200).json({ message: "Email Verified Successfully ✅" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
}


export const updateProfile = async (req, res) => {
  console.log("✅ Reached updateProfile controller");
  try {
    const { id } = req.params;                 
    const { bio } = req.body;

    console.log("User ID:", id);
    console.log("Bio:", bio);
    console.log("File object:", req.file);    

    const updatedData = {};
    if (bio !== undefined) updatedData.bio = bio;
    if (req.file) {
  updatedData.profilePic = req.file.path || req.file.secure_url;
}

    const user = await UserAuth.findByIdAndUpdate(id, updatedData, { new: true }).select("email bio profilePic _id");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "Profile updated successfully",
      user: { id: user._id, email: user.email, bio: user.bio, profilePic: user.profilePic }
    });
  } catch (error) {
    console.error("❌ Error updating profile:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};