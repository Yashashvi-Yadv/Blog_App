import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ConnectDb } from "./config/db.js";
import { authmid } from "./api/middlewares/authmid.js";
import blog_route from "./api/routes/blog.route.js";
import { loader } from "./loaders/Essentials.loader.js";
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
app.use("/", blog_route);
app.use((err, req, res, next) => {
  console.error("💥 Global Error:", err);

  if (res.headersSent) return next(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

ConnectDb();
loader();
app.get("/", (req, res) => {
  console.log("hey");
  console.log(req.ip);
  res.send("Blog service is running fine");
});

export default app;
