import express from "express";
export const app = express();
import { startloader } from "./loaders/Essentials.loader.js";

app.get("/", () => {
  console.log("Like service is currently working fine");
});
startloader(app, express);
