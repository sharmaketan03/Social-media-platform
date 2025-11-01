import express from "express"
import { checkAuth, loginUser, registerUser,DateOFBirth } from "../Controller/profilecontroller.js"
import {verifyToken} from "../middelware/jwtverify.js"
let route=express.Router()

route.post("/registration",registerUser)
route.post("/login",loginUser)
route.post("/userlogin",verifyToken,checkAuth)
route.put("/DoB",DateOFBirth)



export default route