import app from "./app";
import http from "http";
import { connectDatabase } from "./config/database.config";

//connect database

const PORT = 8080;
//http server
const server = http.createServer(app);
const DB_URL = "mongodb://localhost:27017/project_express";
connectDatabase(DB_URL);
//listen to port
server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
 