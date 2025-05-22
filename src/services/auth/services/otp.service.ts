import prisma from '../prisma/client';

export const verifyOtpCode = async (email: string, code: string) => {
  const otp = await prisma.otp.findFirst({
    where: {
      email,
      code,
      purpose: 'verify',
    },
  });

  if (!otp) {
    throw new Error('Invalid or expired OTP');
  }

  const isExpired = new Date() > otp.expiresAt;
  if (isExpired) {
    throw new Error('OTP has expired');
  }

  await prisma.user.update({
    where: { email },
    data: { verified: true },
  });

  // Clean up OTP
  await prisma.otp.delete({ where: { id: otp.id } });

  return { message: 'Email verified successfully ✅' };
};
