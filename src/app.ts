import express, { NextFunction, Request, Response } from "express";

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
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error?.ststusCode ?? 500;
  const message = error?.message ?? "Internal Server Error";
  const status = error?.ststus ?? "error";
  const success = false;

  res.status(statusCode).json({
    message,  
    status,
    success,
    data: null,
    stack: error?.stack ?? null,
  });
});

export default app;
