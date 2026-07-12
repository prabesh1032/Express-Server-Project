import { NextFunction, Request, Response } from "express";


const errorhaldler = (error: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error?.ststusCode ?? 500;
  const message = error?.message ?? "Internal Server Error";
  const status = error?.status ?? "error";
  const success = false;

  res.status(statusCode).json({
    message,  
    status,
    success,
    data: null,
    stack: error?.stack ?? null,
  });
}
export default errorhaldler