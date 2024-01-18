'use server'
// Import necessary libraries and modules
import { prisma } from "@/lib/db/prisma";
import { generateSessionToken } from "@/utils/generate-session-token";

export const createSession = async (userId: string): Promise<string> => {
  const sessionToken = generateSessionToken(); // Implement this function to generate a unique session token

  // Calculate expiration date
  const expires = new Date();
  expires.setDate(expires.getDate() + 3);

  await prisma.session.create({
    data: {
      sessionToken,
      userId,
      expires: expires,
    },
  });

  return sessionToken;
};

export const getSession = async (sessionToken: string) => {
  const session = await prisma.session.findUnique({
    where: {
      sessionToken,
    }, include: {
      user: true, 
    },
  });

  return session;
};

export const updateSessionExpiry = async (sessionId: string) => {
  // Calculate new expiration date (e.g., extend by 3 more days)
  const newExpires = new Date();
  newExpires.setDate(newExpires.getDate() + 3);

  // Update session expiry in the database
  await prisma.session.update({
    where: {
      id: sessionId,
    },
    data: {
      expires: newExpires,
    },
  });
};

export const deleteSession = async (sessionToken: string) => {
  await prisma.session.delete({
    where: {
      sessionToken,
    },
  });
};
