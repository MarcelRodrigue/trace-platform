export const generateOtp = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const otpExpiresIn = (): Date => {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 10);
  return now;
};
