import express from "express";
const app = express.Router();
import {
  register,
  User,
  getuserbyemail,
} from "../controller/auth.controller.js";
import { authmid } from "../middlewares/authmid.js";

app.post("/register", register);
app.get("/me", authmid, User);
app.get("/search/:email", authmid, getuserbyemail);

app.get("/register", (req, res) => {
  console.log("GET request coming ✅");
  res.status(200).json({ message: "GET /register working" });
});

export default app;
