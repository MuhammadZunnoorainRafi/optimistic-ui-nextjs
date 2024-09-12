'use client';
import { Cart, Product } from '@prisma/client';
import { createContext, ReactNode, useContext, useOptimistic } from 'react';

type ActionCart = {
  type: 'ADD' | 'REMOVE';
  payload: any;
};

type CartContextType = {
  optimisticCart: (Cart & { product: { title: string; price: number } })[];
  setOptimisticCart: (action: ActionCart) => void;
  cartProductsSize: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartContextProvider = ({
  children,
  cart,
}: {
  children: ReactNode;
  cart: (Cart & { product: Product })[];
}) => {
  const [optimisticCart, setOptimisticCart] = useOptimistic(
    cart,
    (state, action: ActionCart) => {
      const existingItem = state.find(
        (item) => item.productId === action.payload.productId
      );
      switch (action.type) {
        case 'ADD': {
          if (existingItem) {
            return state.map((item) =>
              item.productId === existingItem.productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          } else {
            return [...state, action.payload];
          }
        }
        case 'REMOVE': {
          if (existingItem) {
            return state.map((item) =>
              item.productId === existingItem.productId
                ? { ...existingItem, quantity: existingItem.quantity - 1 }
                : item
            );
          }
          // return [
          //   existingItem
          //     ? { ...existingItem, quantity: existingItem.quantity - 1 }
          //     : undefined,
          // ];
        }
        default: {
          return state;
        }
      }
    }
  );

  const cartProductsSize = optimisticCart.reduce((a, c) => a + c.quantity, 0);

  return (
    <CartContext.Provider
      value={{ optimisticCart, setOptimisticCart, cartProductsSize }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  return context as CartContextType;
};
