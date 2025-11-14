import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import proxyRoutes from "./routes/route.js";

dotenv.config();

const app = express();

// ✅ Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
proxyRoutes(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());
// ✅ Mount the proxy routes

// ✅ Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ message: "API Gateway is running ✅" });
});

export default app;
