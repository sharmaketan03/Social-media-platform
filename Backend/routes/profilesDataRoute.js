import express from "express"
import { checkAuth, loginUser, registerUser,DateOFBirth ,emailverify,updateProfile,UserLogin,LogOut} from "../Controller/profilecontroller.js"
import {verifyToken} from "../middelware/jwtverify.js"
import { getAlldata ,profileuser,EditProfiles,updatepic,getNotifications,sendFollowRequest} from "../Controller/Data.js"
import { uploadCloud } from "../middelware/cloudinaryUpload.js"


let route=express.Router()

route.post("/registration",registerUser)
route.post("/login",loginUser)
route.get("/userlogin",verifyToken,checkAuth)
route.put("/DoB",DateOFBirth)
route.put("/update-profile/:id", uploadCloud.single("profilePic"), updateProfile);
route.post("/verifysendEmail-otp",emailverify)
// route.get("/UserLoginOrNot",verifyToken,UserLogin)
route.post("/userLogOut",verifyToken,LogOut)
route.get("/getAllUser",verifyToken,getAlldata)
route.get("/getProfile",verifyToken,profileuser)



route.put("/editProfile",verifyToken,EditProfiles)
route.put("/updateProfilepic",verifyToken,uploadCloud.single("profilePic"),updatepic)
route.post("/followrequest",verifyToken,sendFollowRequest)

route.get("/notifications",verifyToken,getNotifications)









    

export default route