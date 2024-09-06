'use server';

import { getUserServer } from '@/hooks/getUserServert';
import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const action_addLike = async (productId: string) => {
  const user = await getUserServer();
  if (!user) {
    return { error: 'Unauthorized' };
  }

  if (!productId) {
    return { error: 'Product not found' };
  }

  try {
    const likeWithSameUser = await db.like.findUnique({
      where: { userId_productId: { userId: user.id, productId: productId } },
    });
    if (likeWithSameUser) {
      await db.like.delete({
        where: { userId_productId: { userId: user.id, productId: productId } },
      });
    } else {
      await db.like.create({ data: { userId: user.id, productId: productId } });
    }
    revalidatePath('/');
  } catch (error) {
    console.log(error);
    return { error: 'Internal Server Error' };
  }
};
