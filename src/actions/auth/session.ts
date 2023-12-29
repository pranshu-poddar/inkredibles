'use server'
// Import necessary libraries and modules
import { prisma } from "@/lib/db/prisma";
import { generateSessionToken } from "@/utils/generate-session-token";

export const createSession = async (userId: string): Promise<string> => {
  const sessionToken = generateSessionToken(); // Implement this function to generate a unique session token

  // Calculate expiration date
  const expires = new Date();
  expires.setDate(expires.getDate() + 1);

  await prisma.session.create({
    data: {
      sessionToken,
      userId,
      expires: expires,
    },
  });

  return sessionToken;
};
