import { createServer } from "http";
import app from "./src/app.js";
import ENV from "./src/configs/env.js";

const server = createServer(app);
const port = ENV.PORT;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
