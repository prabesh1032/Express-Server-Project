import { NextFunction, Request, Response } from "express";

const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error?.statusCode ?? 500;
  const message = error?.message ?? "Internal Server Error";
  const status = error?.status ?? "error";

  res.status(statusCode).json({
    message,
    status,
    success: false,
    data: null,
    stack: error?.stack ?? null,
  });
};

export default errorHandler;