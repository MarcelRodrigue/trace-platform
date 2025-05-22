import { Request, Response } from 'express';
import { registerUser } from '../services/auth.service';

export const registerController = async (req: Request, res: Response) => {
  try {
    const result = await registerUser(req.body);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ error: true, message: error.message });
  }
};
