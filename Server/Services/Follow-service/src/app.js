import express from "express";
export const app = express();
import { startloader } from "./loaders/Essentials.loader.js";

app.get("/", (req, res) => {
  console.log("Request service is currently working fine");
  return res.json({
    message: "working fine",
  });
});
startloader(app, express);
