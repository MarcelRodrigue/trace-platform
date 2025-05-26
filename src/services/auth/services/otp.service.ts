import prisma from '../prisma/client';
import { generateOtp, otpExpiresIn } from '../utils/otp';

export const verifyOtpCode = async (email: string, code?: string) => {
  if (!email) throw new Error('Email is required.');

  // ✅ If no code provided, resend new OTP
  if (!code) {
    const newOtp = generateOtp();

    // Delete old OTPs
    await prisma.otp.deleteMany({
      where: { email, purpose: 'verify' },
    });

    // Save new OTP
    await prisma.otp.create({
      data: {
        email,
        code: newOtp,
        purpose: 'verify',
        expiresAt: otpExpiresIn(),
      },
    });

    // Simulate sending OTP
    console.log(`🔁 New OTP sent to ${email}: ${newOtp}`);

    return {
      message: 'New OTP sent to your email.',
    };
  }

  // ✅ If code is provided, verify it
  const otp = await prisma.otp.findFirst({
    where: {
      email,
      code,
      purpose: 'verify',
    },
  });

  if (!otp) throw new Error('Invalid or expired OTP.');

  if (new Date() > otp.expiresAt) {
    throw new Error('OTP has expired');
  }

  await prisma.user.update({
    where: { email },
    data: { verified: true },
  });

  await prisma.otp.delete({ where: { id: otp.id } });

  return {
    message: 'Email verified successfully ✅',
  };
};
