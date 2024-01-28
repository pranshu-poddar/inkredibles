import { saveCartToMongoDB } from "@/actions/account/save-cart";
import { TCart, TCartItem } from "@/lib/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useCartStore = create(
  persist<TCart>(
    (set, get) => ({
      items: [],

      addItem: (cartItem: TCartItem) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) =>
              item.productId === cartItem.productId &&
              item.color === cartItem.color &&
              item.size === cartItem.size,
          );

          const updatedItems = existingItem
            ? state.items.map((item) =>
                item.productId === cartItem.productId &&
                item.color === cartItem.color &&
                item.size === cartItem.size
                  ? { ...item, quantity: item.quantity + cartItem.quantity }
                  : item,
              )
            : [
                ...state.items,
                {
                  productId: cartItem.productId,
                  color: cartItem.color,
                  size: cartItem.size,
                  quantity: cartItem.quantity,
                },
              ];

          saveCartToMongoDB(updatedItems);
          return { items: updatedItems };
        });
        // Call syncWithDatabase after adding an item
        useCartStore.getState().syncWithDatabase();
      },

      removeItem: (cartItem: TCartItem) => {
        set((state) => {
          const updatedItems = state.items.filter(
            (item) =>
              !(
                item.productId === cartItem.productId &&
                item.color === cartItem.color &&
                item.size === cartItem.size
              ),
          );
          saveCartToMongoDB(updatedItems);
          return { items: updatedItems };
        });
        // Call syncWithDatabase after removing an item
        useCartStore.getState().syncWithDatabase();
      },

      updateQuantity: (cartItem: TCartItem) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === cartItem.productId &&
            item.color === cartItem.color &&
            item.size === cartItem.size
              ? { ...item, quantity: cartItem.quantity }
              : item,
          ),
        }));
        // Call syncWithDatabase after updating quantity
        useCartStore.getState().syncWithDatabase();
      },

      clearCart: () => {
        set({ items: [] });
        // Call syncWithDatabase after clearing the cart
        useCartStore.getState().syncWithDatabase();
      },

      syncWithDatabase: async () => {
        try {
          const cartState = get();
          await saveCartToMongoDB(cartState.items);
        } catch (error) {
          console.error("Error syncing cart with the database:", error);
        }
      },
    }),
    {
      name: "cart",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

// Add an event listener to save the cart when the user leaves the page (only in the browser environment)
if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", async () => {
    try {
      // Call the syncWithDatabase function to update the database with the local storage cart
      await useCartStore.getState().syncWithDatabase();
    } catch (error) {
      console.error("Error syncing cart with the database:", error);
    }
  });
}
