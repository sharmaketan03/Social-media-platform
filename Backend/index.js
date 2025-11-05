// import express from "express";
// import "dotenv/config";
// import { ConnectDB } from "./config/connectDB.js";
// import route from "./routes/profilesDataRoute.js";
// import cookieParser from "cookie-parser";
// import cors from "cors";

// const app = express();

// app.use(express.json());
// app.use(cookieParser());
// ConnectDB();

// const corsOptions = {
//   origin: [ process.env.FrontendLocalUrl,process.env.FrontendLocalRender],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true,
// };
// app.use(cors(corsOptions));

// app.use("/profile", route);

// app.listen(process.env.PORT || 5000, () => {
//   console.log(`✅ Server started successfully on port ${process.env.PORT || 5000}`);
// });


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
app.options("*", cors(corsOptions)); // ✅ Preflight fix

app.use("/profile", route);

app.listen(process.env.PORT || 5000, () => {
  console.log(`✅ Server started successfully on port ${process.env.PORT || 5000}`);
});
