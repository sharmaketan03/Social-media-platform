import express from "express";
import http from "http"
import { Server } from "socket.io";
import "dotenv/config";
import { ConnectDB } from "./config/connectDB.js";
import route from "./routes/profilesDataRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
let server=http.createServer(app)

app.use(express.json());
app.use(cookieParser());
ConnectDB();

const corsOptions = {
  origin: [ process.env.FrontendLocalUrl,process.env.FrontendLocalRender],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use("/profile", route);





server.listen(process.env.PORT || 5000, () => {
  console.log(`✅ Server started successfully on port ${process.env.PORT || 5000}`);
});
