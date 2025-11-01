import express from "express";
import "dotenv/config";
import { ConnectDB } from "./config/connectDB.js";
import route from "./routes/profilesDataRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieParser());
ConnectDB();

const corsOptions = {
  origin: [process.env.FrontendLocalUrl || "http://localhost:5173",process.env.FrontendLocalRender],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use("/profile", route);

app.listen(process.env.PORT || 5000, () => {
  console.log(`✅ Server started successfully on port ${process.env.PORT || 5000}`);
});
