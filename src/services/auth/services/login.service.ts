import prisma from '../prisma/client';
import { comparePassword } from '../utils/hash';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt';

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.verified) {
    throw new Error('Account not found or not verified');
  }

  const passwordMatch = await comparePassword(password, user.password);
  if (!passwordMatch) {
    throw new Error('Invalid credentials');
  }

  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    companyId: user.companyId,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  // Save refresh token to DB
  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    },
  });

  return {
    accessToken,
    refreshToken,
    message: 'Login successful',
  };
};
