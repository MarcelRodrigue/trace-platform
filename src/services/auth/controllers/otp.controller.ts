import { Request, Response } from 'express';
import { verifyOtpCode } from '../services/otp.service';

export const verifyOtpController = async (req: Request, res: Response) => {
  try {
    const { email, code } = req.body;

    if (!email) {
      res.status(400).json({ error: true, message: 'Email is required.' });
      return;
    }

    const result = await verifyOtpCode(email, code);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(400).json({ error: true, message: err.message });
  }
};
