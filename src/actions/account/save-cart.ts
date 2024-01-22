"use server";
import { prisma } from "@/lib/db/prisma";
import { TCartItem } from "@/lib/types";
import Cookies from "js-cookie";

export async function saveCartToMongoDB(cartItems: TCartItem[]): Promise<void> {
  try {
    // Find the user's ID from the cookie
    const userId = Cookies.get("at"); // replace this with your actual cookie name
    console.log(userId);
    // Check if the user has a cart in the database
    const existingCart = await prisma.cart.findFirst({
      where: {
        accountId: userId,
      },
    });

    // Create or update the cart based on whether it already exists
    if (existingCart) {
      // Retrieve existing items in the cart
      const existingItems = await prisma.cartItem.findMany({
        where: {
          cartId: existingCart.id,
        },
      });

      // Separate items to be updated, items to be created, and items to be deleted
      const itemsToUpdate = cartItems.filter((item) => {
        const existingItem = existingItems.find(
          (existing) =>
            existing.productId === item.productId &&
            existing.color === item.color &&
            existing.size === item.size,
        );
        return !!existingItem;
      });

      const itemsToCreate = cartItems.filter((item) => {
        const existingItem = existingItems.find(
          (existing) =>
            existing.productId === item.productId &&
            existing.color === item.color &&
            existing.size === item.size,
        );
        return !existingItem;
      });

      const itemsToDelete = existingItems.filter((existingItem) => {
        return !cartItems.some(
          (item) =>
            item.productId === existingItem.productId &&
            item.color === existingItem.color &&
            item.size === existingItem.size,
        );
      });

      // Update existing items in the cart
      await Promise.all(
        itemsToUpdate.map(async (item) => {
          const existingItem = existingItems.find(
            (existing) =>
              existing.productId === item.productId &&
              existing.color === item.color &&
              existing.size === item.size,
          );

          // Update the quantity of the existing item to the new value in cartItems
          await prisma.cartItem.update({
            where: {
              id: existingItem?.id,
            },
            data: {
              quantity: item.quantity,
            },
          });
        }),
      );

      // Create new items in the cart
      if (itemsToCreate.length > 0) {
        await prisma.cartItem.createMany({
          data: itemsToCreate.map((item) => ({
            productId: item.productId,
            quantity: Math.max(0, item.quantity), // Ensure quantity is positive
            color: item.color,
            size: item.size,
            cartId: existingCart.id,
          })),
        });
      }

      // Delete items not present in the local cart
      await Promise.all(
        itemsToDelete.map(async (existingItem) => {
          await prisma.cartItem.delete({
            where: {
              id: existingItem.id,
            },
          });
        }),
      );
    } else {
      // If the cart doesn't exist, create a new cart for the user
      await prisma.cart.create({
        data: {
          accountId: userId,
          items: {
            createMany: {
              data: cartItems.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
                color: item.color,
                size: item.size,
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
