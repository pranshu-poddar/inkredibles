'use server';
import { prisma } from "@/lib/db/prisma";
import { TCartItem } from "@/lib/types";
import Cookies from "js-cookie";

export async function saveCartToMongoDB(cartItems: TCartItem[]): Promise<void> {
  try {
    // Retrieve user ID from the cookie
    const userId = Cookies.get("at"); // Replace this with the correct cookie name
    console.log("User ID:", userId);

    // Check for an existing cart in the database
    const existingCart = await prisma.cart.findFirst({
      where: { accountId: userId },
    });

    if (existingCart) {
      // Fetch existing cart items
      const existingItems = await prisma.cartItem.findMany({
        where: { cartId: existingCart.id },
      });

      // Separate items for updating, creating, and deleting
      const itemsToUpdate = cartItems.filter((item) =>
        existingItems.some(
          (existing) =>
            existing.productId === item.productId &&
            existing.color === item.color &&
            existing.size === item.size
        )
      );

      const itemsToCreate = cartItems.filter((item) =>
        !existingItems.some(
          (existing) =>
            existing.productId === item.productId &&
            existing.color === item.color &&
            existing.size === item.size
        )
      );

      const itemsToDelete = existingItems.filter((existingItem) =>
        !cartItems.some(
          (item) =>
            item.productId === existingItem.productId &&
            item.color === existingItem.color &&
            item.size === existingItem.size
        )
      );

      // Update existing items in the cart
      await Promise.all(
        itemsToUpdate.map(async (item) => {
          const existingItem = existingItems.find(
            (existing) =>
              existing.productId === item.productId &&
              existing.color === item.color &&
              existing.size === item.size
          );

          await prisma.cartItem.update({
            where: { id: existingItem?.id },
            data: { quantity: Math.max(0, item.quantity) },
          });
        })
      );

      // Create new items in the cart
      if (itemsToCreate.length > 0) {
        await prisma.cartItem.createMany({
          data: itemsToCreate.map((item) => ({
            productId: item.productId,
            quantity: Math.max(0, item.quantity),
            color: item.color,
            size: item.size,
            cartId: existingCart.id,
            image: item.image || "",
            price: item.price,
            total: item.price * item.quantity,
          })),
        });
      }

      // Delete items that are no longer in the local cart
      await Promise.all(
        itemsToDelete.map(async (existingItem) => {
          await prisma.cartItem.delete({ where: { id: existingItem.id } });
        })
      );
    } else {
      // Create a new cart and items if the cart doesn't exist
      await prisma.cart.create({
        data: {
          accountId: userId,
          items: {
            createMany: {
              data: cartItems.map((item) => ({
                productId: item.productId,
                quantity: Math.max(0, item.quantity),
                color: item.color,
                size: item.size,
                image: item.image || "",
                price: item.price,
               total: item.price * item.quantity,
              })),
            },
          },
        },
      });
    }
  } catch (error) {
    console.error("Error saving cart to MongoDB:", error);
    throw new Error("Failed to save cart to MongoDB");
  }
}
