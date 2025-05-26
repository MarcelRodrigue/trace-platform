import { Request, Response } from 'express';
import { refreshAccessToken } from '../services/refresh.service';

export const refreshController = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      res.status(401).json({ error: true, message: 'Refresh token missing' });
      return;
    }

    const result = await refreshAccessToken(refreshToken);

    res.status(200).json(result);
  } catch (err: any) {
    res.status(403).json({ error: true, message: err.message });
  }
};
