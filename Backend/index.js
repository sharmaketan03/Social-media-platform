import express from "express";
import "dotenv/config";
import { ConnectDB } from "./config/connectDB.js";
import route from "./routes/profilesDataRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
ConnectDB();

// CORS setup
const whitelist = [
  process.env.FrontendLocalUrl,
  process.env.FrontendRenderUrl
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS ❌ " + origin));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("/*", cors(corsOptions)); // Preflight safe

// Routes
app.use("/profile", route);

// Optional: Serve frontend (React) build in production
// Uncomment and adjust path if needed
/*
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "client/build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});
*/

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server started successfully on port ${PORT}`);
});
