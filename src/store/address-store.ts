// addressStore.js
import { TAddressForm } from '@/lib/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AddressStore {
  selectedAddress: TAddressForm | null;
  setSelectedAddress: (address: TAddressForm) => void;
  deleteSelectedAddress: () => void; // New function to delete the selected address
}

const useAddressStore = create(
  persist<AddressStore>(
    (set) => ({
      selectedAddress: null,
      setSelectedAddress: (address: TAddressForm) => set({ selectedAddress: address }),
      deleteSelectedAddress: () => set({ selectedAddress: null }), // Implementation to delete the selected address
    }),
    {
      name: 'address-store', // a unique name for the persisted store
      getStorage: () => localStorage, // optional, defaults to localStorage
    }
  )
);

export default useAddressStore;
