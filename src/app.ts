import express, { Request, Response } from "express";
import errorHandler from "./middleware/errorhandlermiddleware";
import authRouter from "./routes/auth.routes";

const app = express();

//middleware
app.use(express.json());

//health check routes
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Server is up and running !!!!!!!!!!",
    success: true,
    status: "success",
    data: null,
  });
});

//using routes

//using path not found route
app.use((req: Request, res: Response) => {
  const message = `cannot ${req.method} on ${req.path}`;
  res.status(404).json({
    message,
    status: "fail",
    success: false,
    data: null,
  });
});
app.use("/api/v1/auth", authRouter);

//error handler middleware
app.use(errorHandler);

export default app;
