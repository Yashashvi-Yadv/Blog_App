import { app } from "./app.js";
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`port is running fine at http://localhost:${port}`);
});
