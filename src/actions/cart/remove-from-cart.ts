'use server';

import { getUserServer } from '@/hooks/getUserServert';
import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const action_removeFromCart = async (cartProductId: string) => {
  const user = await getUserServer();
  if (!user) {
    return { error: 'Unauthorized' };
  }

  if (!cartProductId) {
    return { error: 'Cart product not found' };
  }

  try {
    const existingCartProduct = await db.cart.findUnique({
      where: { id: cartProductId },
    });

    if (!existingCartProduct) {
      return { error: 'Cart product not found' };
    }

    if (existingCartProduct.quantity <= 1) {
      await db.cart.delete({ where: { id: existingCartProduct.id } });
    } else {
      await db.cart.update({
        where: { id: existingCartProduct.id },
        data: { quantity: existingCartProduct.quantity - 1 },
      });
    }
    revalidatePath('/');
  } catch (error) {
    console.log(error);
    return {
      error: 'Internal Server Error',
    };
  }
};
