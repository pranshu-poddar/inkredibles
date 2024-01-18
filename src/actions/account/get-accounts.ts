'use server'
import { prisma } from "@/lib/db/prisma";
import { getSession } from "../auth/session";

export const getAllAccounts = async () => {
  try {
    const accounts = await prisma.account.findMany({
      include: {
        addresses: true,
        cart: true,
        wishlist: true,
        reviews: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            emailVerified: true,
            sessions: true,
          },
        },
      },
    });
    return accounts;
  } catch (error) {
    console.error("Error fetching accounts:", error);
    throw error; // Re-throw the error for appropriate handling
  }
};



export async function getAccountFromSessionId(sessionId: string) {
  try {
    const session = await getSession(sessionId);

    if (!session?.userId) {
      // Handle the case where session is not found or userId is undefined
      return null;
    }

    const account = await prisma.account.findUnique({
      where: {
        userId: session.userId,
      },
      include:{
        user:{},
        addresses:{},
        cart:{},
        wishlist:{},
      }
    });

    return account;
  } catch (error) {
    console.error("Error fetching account from session:", error);
    return null;
  }
}







