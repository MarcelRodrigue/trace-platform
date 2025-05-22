import { UserPayload } from './auth';

/**
 * Globally extends Express.Request to include `user`
 * so you can use `req.user` anywhere without "as any".
 */
declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}
