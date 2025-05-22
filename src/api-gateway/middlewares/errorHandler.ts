import { Request, Response, NextFunction } from 'express';

/**
 * Catches errors thrown anywhere in the request pipeline.
 * Prevents unhandled crashes and gives consistent error responses.
 */
const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const status = err.status || 500;

  // You can later upgrade this to use a logging library (e.g. Winston)
  console.error(`🔥 Error: ${err.message}`);

  res.status(status).json({
    error: true,
    message: err.message || 'Internal Server Error',
    type: err.type || 'SERVER_ERROR'
  });
};

export default errorHandler;
