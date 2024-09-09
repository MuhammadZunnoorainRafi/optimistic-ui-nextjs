'use client';
import { Cart, Product } from '@prisma/client';
import React from 'react';
import { Button } from '../ui/button';
import { action_addToCart } from '@/actions/cart/add-to-cart';
import { toast } from 'sonner';
import { action_removeFromCart } from '@/actions/cart/remove-from-cart';

type Props = {
  item: Cart & { product: Product };
};

function CartItem({ item }: Props) {
  const handleAddToCart = async () => {
    const res = await action_addToCart(item.product.id);
    if (res?.error) {
      toast.error(res.error);
    }
  };

  const handleRemoveFromCart = async () => {
    const res = await action_removeFromCart(item.id);
    if (res?.error) {
      toast.error(res.error);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <h1 className="font-bold flex-[0.7]">{item.product.title}</h1>
      <div className="flex items-center justify-center gap-1 flex-[0.3]">
        <Button
          className="rounded-full"
          onClick={handleRemoveFromCart}
          size="icon"
        >
          -
        </Button>
        <span>{item.quantity}</span>
        <Button className="rounded-full" onClick={handleAddToCart} size="icon">
          +
        </Button>
      </div>
    </div>
  );
}

export default CartItem;
