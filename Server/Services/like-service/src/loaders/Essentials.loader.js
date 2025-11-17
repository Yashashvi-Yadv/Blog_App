import cors from "cors";
import { ConnectDb } from "../config/db.js";
import dotenv from "dotenv";
import { errorMiddleware } from "../core/errors/err.mid.js";
dotenv.config();
export function startloader(app, express) {
  app.use(
    cors({
      origin: ["http://localhost:8000", "http://localhost:5173"],
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(errorMiddleware);
  ConnectDb();
}
