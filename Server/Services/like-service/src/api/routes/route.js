import express from "express";
import LikeController from "../controllers/like.controller.js";
import { authmid } from "../middlewares/authmid.js";
const router = express.Router();

// Like a blog
router.post("/like/:blogId", authmid, LikeController.like);

// Unlike a blog
router.delete("/unlike/:blogId", authmid, LikeController.unlike);

// Get total likes
router.get("/count/:blogId", authmid, LikeController.getCount);

export default router;
