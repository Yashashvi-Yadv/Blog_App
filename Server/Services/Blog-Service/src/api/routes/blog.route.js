import express, { Router } from "express";
import { authmid } from "../middlewares/authmid.js";
import {
  creatPost,
  ShowPost,
  DeletePost,
  UpdatePost,
  postwithid,
} from "../controllers/blog.controller.js";
const app = express.Router();
app.post("/create", authmid, creatPost);
app.get("/myblog", authmid, ShowPost);
app.get("/:id", authmid, postwithid);
app.delete("/delete/:id", authmid, DeletePost);
app.put("/update/:id", authmid, UpdatePost);

export default app;
