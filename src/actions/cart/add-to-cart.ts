'use server';

import { getUserServer } from '@/hooks/getUserServert';
import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const action_addToCart = async (productId: string) => {
  const user = await getUserServer();
  if (!user) {
    return { error: 'Unauthorized' };
  }

  if (!productId) {
    return { error: 'Product not found' };
  }

  try {
    const existingProduct = await db.cart.findUnique({
      where: { userId_productId: { userId: user.id, productId: productId } },
    });
    if (existingProduct) {
      await db.cart.update({
        where: { id: existingProduct.id },
        data: { quantity: existingProduct.quantity + 1 },
      });
    } else {
      await db.cart.create({
        data: { userId: user.id, productId: productId, quantity: 1 },
      });
    }
    revalidatePath('/');
  } catch (error) {
    console.log(error);
    return { error: 'Internal Server Error' };
  }
};
