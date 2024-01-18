"use server";
import { prisma } from "@/lib/db/prisma";
import { createSession, updateSessionExpiry } from "./session"; // Import the necessary functions

export async function verifyOtp(otp: string, email: string) {
  // Fetch the stored user data from the database
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id:true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      emailVerified: true,
      sessions: true,
      otpExpires:true,
      otp:true,
    },
  });

  // Check if the user exists
  if (!user) {
    return { sessionToken: "", message: "User not found.", status: 404 };
  }

  // Check if the OTP expiration is available and if it's expired
  const otpExpiration = user.otpExpires;
  if (otpExpiration && new Date() > otpExpiration) {
    return {
      sessionToken: "",
      message: "OTP has expired. Please request a new one.",
      status: 403,
    };
  }

  // Compare the entered OTP with the stored OTP
  if (otp !== user.otp) {
    return {
      sessionToken: "",
      message: "Invalid OTP. Please try again.",
      status: 401,
    };
  }

  // Check if the user already has an existing session
  const existingSession = await prisma.session.findFirst({
    where: {
      userId: user.id,
      expires: { gt: new Date() }, // Check if the session is still valid
    },
  });

  let sessionToken;

  // If an existing session is found, update its expiry
  if (existingSession) {
    sessionToken = existingSession.sessionToken;
    await updateSessionExpiry(existingSession.id);
  } else {
    // If no existing session, create a new session
    sessionToken = await createSession(user.id);
  }

  // Update user status in the database
  if (!user.emailVerified) {
    await prisma.user.update({
      where: { email },
      data: { emailVerified: new Date(), otp: null, otpExpires: null },
    });
  } else {
    await prisma.user.update({
      where: { email },
      data: { otp: null, otpExpires: null },
    });
  }

  const newuser = await prisma.user.findUnique({
    where: { email },
    select: {
      id:true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      emailVerified: true,
      sessions: true,
    },
  });

  return {
    message: "OTP verified",
    user: newuser,
    sessionToken: sessionToken,
    status: 200,
  };
}
