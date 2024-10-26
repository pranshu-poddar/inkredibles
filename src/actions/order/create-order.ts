'use server';
import { prisma } from "@/lib/db/prisma";
import { TCartItem } from "@/lib/types";

export const createOrder = async (data: {
  orderId: string;
  accountId: string;
  totalAmount: number;
  addressId: string;
  items: TCartItem[];
}) => {
  try {
    // Destructure and validate data fields
    const { orderId, accountId, totalAmount, addressId, items } = data;
    if (!orderId || !accountId || !totalAmount || !addressId || !items.length) {
      throw new Error("Missing required order fields");
    }

    // Create order and associated order items in a transaction
    const order = await prisma.order.create({
      data: {
        orderId,
        accountId,
        totalAmount,
        addressId,
        items: {
          create: items.map((item) => ({
            quantity: item.quantity,
            productId: item.productId,
            color: item.color,
            size: item.size,
            price: item.price,
            total: item.total??0,
            image: item.image??"",
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
