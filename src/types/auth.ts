/**
 * The payload structure stored in a JWT token.
 * This will be added to `req.user` after decoding.
 */
export interface UserPayload {
  id: string;
  email: string;
  role: string; // 'admin', 'analyst', 'agent', etc.
}
