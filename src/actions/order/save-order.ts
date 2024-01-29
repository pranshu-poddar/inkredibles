"use server";
import { prisma } from "@/lib/db/prisma";

export async function createOrder(orderData: {
  orderId: any;
  accountId: any;
  totalAmount: any;
  addressId: any;
  items: any[];
}) {
    console.log('order data',orderData);

  try {
    // Create a new order in the database
    const createdOrder = await prisma.order.create({
      data: {
        orderId: orderData.orderId,
        accountId: orderData.accountId,
        totalAmount: orderData.totalAmount,
        shippingAddress: {
          connect: { id: orderData.addressId },
        },
        items: {
          create: orderData.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            color: item.color,
            size: item.size,
          })),
        },
        account: { connect: { id: orderData.accountId } }, // Connect the account
      },
      include: {
        items: true,
        shippingAddress: true,
        account: true, // Include the account in the result
      },
    });
    console.log('created order',createdOrder);

    return createdOrder;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
