"use server";
import { prisma } from "@/lib/db/prisma";
import { TSignupSchema, signupSchema } from "@/lib/types";
import bcrypt from "bcrypt";
import { generateOTP } from "@/utils/generate-otp";
import { sendOTP } from "./send-otp";

export const Register = async (data: TSignupSchema) => {
  // Validate the incoming data
  const validationResult = signupSchema.safeParse(data);
  if (!validationResult.success) {
    return { error: "Invalid data", status: 400 };
  }

  // Check if the user already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    return { error: "User already exists", status: 400 };
  }

  // Generate OTP
  const OTP = generateOTP();
  const otpExpiration = new Date(Date.now() + 15 * 60 * 1000);

  // Hash the password
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // Create a new user with hashed password and OTP
  try {
    const newUser = await prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        password: hashedPassword,
        otp: OTP,
        otpExpires: otpExpiration,
      },
    });

    // Create account with default values
    await prisma.account.create({
      data: {
        userId: newUser.id
      },
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

    return { user: newUser, status: 200 };
  } catch (error) {
    console.error("Error creating user:", error);
    return { error: "Internal server error", status: 500 };
  }
};
