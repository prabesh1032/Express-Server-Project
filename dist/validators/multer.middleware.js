"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerUploder = void 0;
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const apperror_utils_1 = __importDefault(require("../utils/apperror.utils"));
const multerUploder = () => {
    const folder = path_1.default.resolve(__dirname, "../../uploads"); // keep uploads independent of server start directory
    const fileSize = 1024 * 1024 * 5; // 5MB file size limit
    const allowedextensions = [".jpg", ".jpeg", ".png", ".gif"]; // allowed file extensions
    const allowedFileTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
    ]; // allowed file types
    if (!fs_1.default.existsSync(folder)) {
        fs_1.default.mkdirSync(folder, { recursive: true }); // create folder if it doesn't exist and recursive: true to create parent directories if needed
    }
    const myStorage = multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            cb(null, folder);
        },
        filename: (req, file, cb) => {
            const filename = Date.now() + "-" + file.originalname; //for make unique filename.
            cb(null, filename);
        },
    });
    const fileFilter = (req, file, cb) => {
        // check file extension
        if (!allowedextensions.includes(path_1.default.extname(file.originalname).toLowerCase()) ||
            !allowedFileTypes.includes(file.mimetype)) {
            return cb(new apperror_utils_1.default("File type not allowed", 400));
        }
        cb(null, true);
    };
    //check file mime type
    const upload = (0, multer_1.default)({
        storage: myStorage,
        fileFilter: fileFilter,
        limits: { fileSize: fileSize },
    });
    return upload;
};
exports.multerUploder = multerUploder;
