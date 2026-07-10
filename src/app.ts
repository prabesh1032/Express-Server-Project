import express, { Request, Response } from "express";
import errorHandler from "./middleware/errorhandlermiddleware";

const app = express();

//middleware
app.use(express.json());

//health check routes
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Server is up and running !!!!!!!!!!",
    sucess: true,
    status: "sucess",
    data: null,
  });
});

//using routes

//using path not found route
app.use((req: Request, res: Response) => {
  const message = "can not ${req.method} on ${req.path}";
  res.status(404).json({
    message,
    status: "fail",
    success: false,
    data: null,
  });
});

//error handler middleware
app.use(errorHandler);

export default app;
