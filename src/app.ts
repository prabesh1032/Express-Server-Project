import express, { Request, Response } from "express";
import cors from "cors";
import errorHandler from "./middleware/errorhandlermiddleware";
import authRouter from "./routes/auth.routes";
import brandRouter from "./routes/brand.routes";
import categoryRouter from "./routes/category.routes";
import productRouter from "./routes/product.routes";
import { ENV_CONFIG } from "./config/env.config";

const app = express();

//middleware
app.use(express.json());
app.use(
  cors({
    origin: ENV_CONFIG.CLIENT_URL,
    credentials: true,
  }),
);

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

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/brands", brandRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/products", productRouter);

//using path not found route
app.use((req: Request, res: Response) => {
  const message = `cannot ${req.method} on ${req.path}`;
  const error: any = new Error(message);
  error.statusCode = 404;
  error.status = "fail";
  throw error;
});

//error handler middleware
app.use(errorHandler);

export default app;
