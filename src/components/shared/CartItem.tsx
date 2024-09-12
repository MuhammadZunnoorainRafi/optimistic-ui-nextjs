'use client';
import { Cart, Product } from '@prisma/client';
import React from 'react';
import { Button } from '../ui/button';
import { action_addToCart } from '@/actions/cart/add-to-cart';
import { toast } from 'sonner';
import { action_removeFromCart } from '@/actions/cart/remove-from-cart';
import { useCartContext } from '@/context/CartContext';

type Props = {
  item: Cart & {
    product: {
      title: string;
      price: number;
    };
  };
};
function CartItem({ item }: Props) {
  const { setOptimisticCart } = useCartContext();
  const handleAddToCart = async () => {
    setOptimisticCart({
      type: 'ADD',
      payload: {
        productId: item.productId,
        quantity: 1,
        product: { title: item.product.title, price: item.product.price },
      },
    });
    const res = await action_addToCart(item.productId);
    if (res?.error) {
      toast.error(res.error);
    }
  };

  const handleRemoveFromCart = async () => {
    setOptimisticCart({
      type: 'REMOVE',
      payload: {
        productId: item.productId,
        quantity: 1,
        product: { title: item.product.title, price: item.product.price },
      },
    });
    const res = await action_removeFromCart(item.id);
    if (res?.error) {
      toast.error(res.error);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-1 flex-[0.7]">
          <h1 className="font-bold flex-[0.6] ">{item.product.title}</h1>
          <p className="flex-[0.4]">${item.product.price}</p>
        </div>
        <div className="flex items-center justify-center gap-1 flex-[0.3]">
          <Button
            className="rounded-full"
            onClick={handleRemoveFromCart}
            size="icon"
          >
            -
          </Button>
          <span>{item.quantity}</span>
          <Button
            className="rounded-full"
            onClick={handleAddToCart}
            size="icon"
          >
            +
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
