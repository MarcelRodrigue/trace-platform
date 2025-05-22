import { Request, Response } from 'express';
import { loginUser } from '../services/login.service';

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: true, message: 'Email and password are required.' });
      return;
    }

    const result = await loginUser(email, password);

    // ✅ Set refresh token in HTTP-only cookie
    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // ✅ Return access token in response
    res.status(200).json({ accessToken: result.accessToken, message: result.message });
  } catch (err: any) {
    res.status(400).json({ error: true, message: err.message });
  }
};
