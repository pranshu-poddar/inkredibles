"use server";
import { prisma } from "@/lib/db/prisma";
import { TLoginSchema, loginSchema } from "@/lib/types";
import bcrypt from "bcrypt";
import { generateOTP } from "@/utils/generate-otp";
import { sendOTP } from "./send-otp";

export const SignIn = async (data: TLoginSchema) => {
  // Validate the incoming data
  const validationResult = loginSchema.safeParse(data);
  if (!validationResult.success) {
    return { error: "Invalid data", status: 400 };
  }

  // Fetch the user from the database based on the provided email
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  // Check if the user exists
  if (!user) {
    return { error: "User not found", status: 404 };
  }

  // Compare the entered password with the stored hashed password
  const isPasswordValid = await bcrypt.compare(data.password, user.password);

  if (!isPasswordValid) {
    return { error: "Invalid password", status: 401 };
  }

  // Generate OTP
  const OTP = generateOTP();
  const otpExpiration = new Date(Date.now() + 15 * 60 * 1000);

  // Update user status in the database
  await prisma.user.update({
    where: { email: data.email },
    data: { otp: OTP, otpExpires: otpExpiration },
  });

  // Prepare email content
  const emailContent = `Your verification code is: ${OTP}`;

  // Send email using the separate sendOTP function
  try {
    await sendOTP(data.email, "Email Verification", emailContent);
  } catch (error) {
    console.error("Error sending verification email:", error);
    // Handle error appropriately
  }
  return { user: user, status: 200 };
};
