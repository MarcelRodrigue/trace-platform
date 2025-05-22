import { Request, Response, NextFunction } from 'express';

/**
 * Logs every incoming HTTP request's method, path, and timestamp.
 * Helps during development and debugging to see all activity.
 */
const logger = (req: Request, _res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next(); // Continue to the next middleware or route handler
};

export default logger;
