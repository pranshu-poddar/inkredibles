'use server';
import { prisma } from "@/lib/db/prisma";

export const createOrder = async (data: {
  orderId: string;
  accountId: string;
  totalAmount: number;
  addressId: string;
  items: { productId: string; quantity: number; color: string; size: string; image: string; price: number; }[];
}) => {
  try {
    // Destructure and validate data fields
    const { orderId, accountId, totalAmount, addressId, items } = data;
    if (!orderId || !accountId || !totalAmount || !addressId || !items.length) {
      throw new Error("Missing required order fields");
    }

    // Calculate total for each item based on quantity and price
    const itemsWithTotal = items.map((item) => ({
      ...item,
      total: item.price * item.quantity, // Total for each item
    }));

    // Create order and associated order items in a transaction
    const order = await prisma.order.create({
      data: {
        orderId,
        accountId,
        totalAmount,
        addressId,
        items: {
          create: itemsWithTotal.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            color: item.color,
            size: item.size,
            price: item.price,
            total: item.total,
            image: item.image,
          })),
        },
      },
      include: { items: true },
    });

    return { success: true, order };
  } catch (error) {
    console.error("Error creating order:", error);
    return { success: false, message: "Failed to create order", error };
  }
};
