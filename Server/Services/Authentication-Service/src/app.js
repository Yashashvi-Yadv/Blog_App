import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./api/middlewares/err.mid.js";
import { ConnectDb } from "./config/db.js";
import authroute from "./api/route/auth.route.js";
const app = express();

app.use(
  cors({
    origin: ["http://localhost:8000", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/", authroute);
app.use((err, req, res, next) => {
  console.error("💥 Global Error:", err);

  if (res.headersSent) return next(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

ConnectDb();
app.get("/", (req, res) => {
  console.log("hey");
  console.log(req.ip);
  res.send("authentication service is running fine");
});

export default app;
