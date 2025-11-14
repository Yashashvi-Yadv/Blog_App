import server from "./app.js";
const port = process.env.PORT || 8001;
server.listen(port, () => {
  console.log("port is running on http://localhost:8001");
});
