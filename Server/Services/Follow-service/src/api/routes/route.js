import express from "express";
import {
  follow,
  unfollow,
  getFollowers,
  getFollowing,
} from "../controllers/follow.controller.js";
const router = express.Router();
import { authmid } from "../middlewares/authmid.js";

router.post("/follow", authmid, follow);
router.post("/unfollow", authmid, unfollow);

router.get("/following/:followerId", authmid, getFollowing);
router.get("/followers/:followingId", authmid, getFollowers);
router.get("/follow", (r, s) => {
  return s.json({
    message: "route working fine",
  });
});

export default router;
