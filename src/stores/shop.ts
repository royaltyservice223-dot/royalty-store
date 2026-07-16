import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  qty: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  add: (id: string, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  toggle: (open?: boolean) => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      add: (id, qty = 1) =>
        set((s) => {
          const existing = s.items.find((i) => i.id === id);
          if (existing) {
            return {
              items: s.items.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i)),
              isOpen: true,
            };
          }
          return { items: [...s.items, { id, qty }], isOpen: true };
        }),
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      setQty: (id, qty) =>
        set((s) => ({
          items: s.items
            .map((i) => (i.id === id ? { ...i, qty } : i))
            .filter((i) => i.qty > 0),
        })),
      clear: () => set({ items: [] }),
      toggle: (open) => set((s) => ({ isOpen: open ?? !s.isOpen })),
    }),
    { name: "royalty-cart" },
  ),
);

interface FavState {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
}

export const useFavorites = create<FavState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) =>
        set((s) => ({
          ids: s.ids.includes(id) ? s.ids.filter((x) => x !== id) : [...s.ids, id],
        })),
      has: (id) => get().ids.includes(id),
    }),
    { name: "royalty-favs" },
  ),
);
