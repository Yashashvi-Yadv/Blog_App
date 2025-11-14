/* 

 Importing Modules and creating Server

*/

import server from "./app.js";
import dotenv from "dotenv";
dotenv.config();

// calling port
const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`gateway is runninng on http://localhost:${port}`);
});
