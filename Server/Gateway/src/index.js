/* 

 Importing Modules and creating Server

*/

import { createGateway } from "./app.js";
import dotenv from "dotenv";
import { createServer } from "node:http";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = createGateway();
app.get("/", (req, res) => {
  res.send("working fine");
});
app.use(errorMiddleware);
const server = createServer(app);
dotenv.config();

// calling port
const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`gateway is runninng on http://localhost:${port}`);
});
