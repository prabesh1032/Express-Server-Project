import app from "./app";
import http from "http";

//connect database

const PORT = 8080;
//http server
const server = http.createServer(app);

//listen to port
server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
