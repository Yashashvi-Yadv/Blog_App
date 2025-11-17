import cors from "cors";
import { ConnectDb } from "../config/db.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { errorMiddleware } from "../core/errors/err.mid.js";
dotenv.config();
import followroute from "../api/routes/route.js";
export function startloader(app, express) {
  app.use(
    cors({
      origin: ["http://localhost:8000", "http://localhost:5173"],
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(followroute);
  app.use(errorMiddleware);
  ConnectDb();
}
