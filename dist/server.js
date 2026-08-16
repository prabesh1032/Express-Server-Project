"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const http_1 = __importDefault(require("http"));
const database_config_1 = require("./config/database.config");
const env_config_1 = require("./config/env.config");
//connect database
const PORT = env_config_1.ENV_CONFIG.PORT;
//http server
const server = http_1.default.createServer(app_1.default);
const DB_URL = env_config_1.ENV_CONFIG.DB_URL;
(0, database_config_1.connectDatabase)(DB_URL);
//listen to port
server.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
});
