// orders.ts (located in the appropriate folder)
'use server';

import { prisma } from "@/lib/db/prisma";
import { getSession } from "../auth/session";

// Function to fetch user orders based on the session
export const getUserOrders = async (sessionId: string) => {
  try {
    // Retrieve the session
    const session = await getSession(sessionId);
    console.log("Session:", session);

    // Ensure the session and accountId exist
    if (!session?.userId) {
      throw new Error("Invalid session or user not found");
    }

    // Fetch orders associated with the account ID
    const orders = await prisma.order.findMany({
      where: {
        accountId: session.userId, // Use accountId instead of userId
      },
      include: {
        items: true,           // Include order items (adjust as needed)
        shippingAddress: true, // Include shipping details
      },
      orderBy: {
        createdAt: 'desc',     // Order by the most recent orders
      },
    });

    console.log("Orders:", orders);

    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};


export const getOrderById = async (sessionId: string, orderId: string) => {
  console.log("Fetching order by ID:", orderId);
  try {
    const session = await getSession(sessionId);
    
    // // Debugging output
    console.log("Session:", session);
    
    if (!session?.userId) {
      console.error("Session does not contain a valid user ID:", session);
      throw new Error("User is not authenticated");
    }

    // Fetch the specific order by orderId, ensuring it's linked to the authenticated user
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
        accountId: session.userId, // Ensure the order is linked to the correct user
      },
      include: {
        items: true,
        shippingAddress: true,
      },
    });

    console.log("Order:", order);
    
    return order;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
};
