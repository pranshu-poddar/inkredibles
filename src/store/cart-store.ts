  import { TCart, TCartItem } from "@/lib/types";
  import { create } from "zustand";
  import { createJSONStorage, persist} from 'zustand/middleware'

  export const useCartStore = create(
     persist<TCart>(
      (set, get) => ({
        items: [],

        addItem: (cartItem: TCartItem) => {
          // Check for existing item and update quantity if found
          const existingItem = get().items.find(
            (item) =>
              item.productId === cartItem.productId &&
              item.color === cartItem.color &&
              item.size === cartItem.size,
          );
          if (existingItem) {
            set((state) => ({
              items: state.items.map((item) =>
                item.productId === cartItem.productId
                  ? { ...item, quantity: item.quantity + cartItem.quantity }
                  : item,
              ),
            }));
          } else {
            set((state) => ({
              items: [
                ...state.items,
                {
                  productId: cartItem.productId,
                  color: cartItem.color,
                  size: cartItem.size,
                  quantity: cartItem.quantity,
                },
              ],
            }));
          }
        },

        removeItem: (cartItem: TCartItem) => {
          set((state) => ({
            items: state.items.filter(
              (item) =>
                !(
                  item.productId === cartItem.productId &&
                  item.color === cartItem.color &&
                  item.size === cartItem.size
                ),
            ),
          }));
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
        },

        clearCart: () => set({ items: [] }),
      }),
      {
        name: "cart",
        storage: createJSONStorage(() => localStorage),
        // partialize: (state) => ({ cart: state.items }),
      },
    ),
  );
