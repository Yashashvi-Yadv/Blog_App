import { app } from "./app.js";
const port = process.env.PORT || 8003;

app.listen(port, () => {
  console.log("port is running fine at http://localhost:8003");
});
