import { atom } from 'jotai';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export const cartAtom = atom<Cart>({
  items: [],
  total: 0,
});

export const cartCountAtom = atom((get) => {
  const cart = get(cartAtom);
  return cart.items.reduce((total, item) => total + item.quantity, 0);
});