'use client';
import { ProductWithLikes } from '@/lib/types';
import { createContext, ReactNode, useContext, useOptimistic } from 'react';

type Action = {
  type: 'ADD' | 'UPDATE' | 'DELETE';
  //   payload: ProductWithLikes;
  payload: any;
};

type ProductContextType = {
  optimisticProduct: ProductWithLikes[];
  setOptimisticProduct: (action: Action) => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductContextProvider = ({
  children,
  products,
}: {
  children: ReactNode;
  products: ProductWithLikes[];
}) => {
  const [optimisticProduct, setOptimisticProduct] = useOptimistic(
    products,
    (state, action: Action) => {
      switch (action.type) {
        case 'ADD': {
          return [action.payload, ...state];
        }
        case 'UPDATE': {
          return state.map((item) =>
            item.title === action.payload.title ? action.payload : item
          );
        }
        case 'DELETE': {
          return state.filter((item) => item.title !== action.payload.title);
        }

        default: {
          return state;
        }
      }
    }
  );

  return (
    <ProductContext.Provider
      value={{ optimisticProduct, setOptimisticProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  return context as ProductContextType;
};
