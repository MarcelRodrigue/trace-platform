import { Router, Request, Response } from 'express';
import { registerController } from '../controllers/auth.controller';

const router = Router();

/**
 * Placeholder auth routes.
 * These will be implemented in controllers soon.
 * Explicit typing on req/res prevents TypeScript inference errors.
 */
router.post('/register', registerController);


router.post('/verify-otp', (req: Request, res: Response) => {
  res.send('Verify OTP');
});

router.post('/login', (req: Request, res: Response) => {
  res.send('Login');
});

router.post('/refresh', (req: Request, res: Response) => {
  res.send('Refresh Token');
});

router.post('/reset-password', (req: Request, res: Response) => {
  res.send('Reset Password');
});

router.post('/set-password', (req: Request, res: Response) => {
  res.send('Set New Password');
});

export default router;


