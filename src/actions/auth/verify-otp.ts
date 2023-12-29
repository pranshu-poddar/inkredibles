"use server";
import { prisma } from "@/lib/db/prisma";
import { createSession } from "./session";

export async function verifyOtp(otp: string, email: string) {
  // Fetch the stored user data from the database
  const user = await prisma.user.findUnique({
    where: { email },
  });

  // Check if the user exists
  if (!user) {
    throw new Error("User not found.");
  }

  // Check if the OTP expiration is available and if it's expired
  const otpExpiration = user.otpExpires;
  if (otpExpiration && new Date() > otpExpiration) {
    throw new Error("OTP has expired. Please request a new one.");
  }

  // Compare the entered OTP with the stored OTP
  if (otp !== user.otp) {
    throw new Error("Invalid OTP. Please try again.");
  }
  // Create a session for the new user
  const sessionToken = await createSession(user.id);

  // Update user status in the database
  await prisma.user.update({
    where: { email },
    data: { emailVerified: new Date(), otp: null, otpExpires: null },
  });

  return {
    message: "OTP verified",
    sessionToken: sessionToken,
    status: 200,
  };
}
