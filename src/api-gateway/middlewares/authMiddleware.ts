import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../../types';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

/**
 * JWT Authentication Middleware
 * - Verifies token from Authorization header
 * - If valid: attaches decoded user info to `req.user`
 * - If invalid: returns 401 Unauthorized
 */
const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      error: true,
      message: 'Missing or invalid Authorization header',
      type: 'AUTH_REQUIRED'
    });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as UserPayload;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({
      error: true,
      message: 'Invalid or expired token',
      type: 'AUTH_INVALID'
    });
    return;
  }
};

export default authMiddleware;
