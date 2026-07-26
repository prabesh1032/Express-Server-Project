import app from "./app";
import http from "http";
import { connectDatabase } from "./config/database.config";
import { ENV_CONFIG } from "./config/env.config";

//connect database

const PORT = ENV_CONFIG.PORT;
//http server
const server = http.createServer(app);
const DB_URL = ENV_CONFIG.DB_URL;
connectDatabase(DB_URL);
//listen to port
server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
 