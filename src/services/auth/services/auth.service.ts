import prisma from '../prisma/client';
import { RegisterInput } from '../types/auth.types';
import { hashPassword } from '../utils/hash';
import { generateOtp, otpExpiresIn } from '../utils/otp';

export const registerUser = async (input: RegisterInput) => {
  const { email, password, name, companyName, companyPlan } = input;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error('User with this email already exists.');

  const invitation = await prisma.invitation.findFirst({ where: { email } });

  let companyId: string;
  let role: string;

  if (invitation) {
    companyId = invitation.companyId;
    role = invitation.role;
    await prisma.invitation.delete({ where: { id: invitation.id } });
  } else {
    if (!companyName || !companyPlan) {
      throw new Error('Company name and plan are required if not invited.');
    }
    const company = await prisma.company.create({
      data: { name: companyName, plan: companyPlan },
    });
    companyId = company.id;
    role = 'admin';
  }

  const hashedPassword = await hashPassword(password);

  await prisma.user.create({
    data: { email, password: hashedPassword, name, role, companyId },
  });

  const otpCode = generateOtp();
  await prisma.otp.create({
    data: {
      email,
      code: otpCode,
      purpose: 'verify',
      expiresAt: otpExpiresIn(),
    },
  });

  console.log(`OTP for ${email}: ${otpCode}`);

  return { message: 'Registration complete. Please verify your email.' };
};
