import express from "express"
import { checkAuth, loginUser, registerUser,DateOFBirth ,emailverify,updateProfile} from "../Controller/profilecontroller.js"
import {verifyToken} from "../middelware/jwtverify.js"
import { uploadCloud } from "../middelware/cloudinaryUpload.js"
let route=express.Router()

route.post("/registration",registerUser)
route.post("/login",loginUser)
route.post("/userlogin",verifyToken,checkAuth)
route.put("/DoB",DateOFBirth)
route.put("/update-profile/:id", uploadCloud.single("profilePic"), updateProfile);
route.post("/verifysendEmail-otp",emailverify)



export default route