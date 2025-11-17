import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
const port = process.env.PORT || 8002;
app.listen(port, () => {
  console.log("port is running on http://localhost:8002");
});
