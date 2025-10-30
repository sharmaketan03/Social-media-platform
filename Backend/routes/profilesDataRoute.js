import express from "express"
import { checkAuth, loginUser, registerUser } from "../Controller/profilecontroller.js"
import {verifyToken} from "../middelware/jwtverify.js"
let route=express.Router()

route.post("/registration",registerUser)
route.post("/login",loginUser)
route.post("/userlogin",verifyToken,checkAuth)



export default route