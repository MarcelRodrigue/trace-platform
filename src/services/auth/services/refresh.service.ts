import prisma from '../prisma/client';
import jwt from 'jsonwebtoken';
import { generateAccessToken } from '../utils/jwt';
import { MyJwtPayload } from '../types/auth.types';


export const refreshAccessToken = async (refreshToken: string) => {
  let decoded: MyJwtPayload;

  try {
    decoded = jwt.verify(refreshToken, process.env.JWT_SECRET!) as MyJwtPayload;
  } catch (err) {
    throw new Error('Invalid refresh token');
  }

  const { id, email, role, companyId } = decoded;

  const storedToken = await prisma.refreshToken.findFirst({
    where: {
      userId: id,
      token: refreshToken,
    },
  });

  if (!storedToken) {
    throw new Error('Refresh token not found in database');
  }

  const accessToken = generateAccessToken({ id, email, role, companyId });

  return {
    accessToken,
    
    message: 'Access token refreshed successfully',

  };
};
