'use server';

import { getUserServer } from '@/hooks/getUserServert';
import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const action_deleteProduct = async (productId: string) => {
  const user = await getUserServer();
  if (!user) {
    return { error: 'Unauthorized' };
  }

  try {
    const deletedProduct = await db.product.delete({
      where: { id: productId },
    });
    if (deletedProduct) {
      revalidatePath('/');
      return { success: 'Product is deleted' };
    } else {
      return { error: 'Product is not deleted' };
    }
  } catch (error) {
    console.log(error);
    return { error: 'Internal Server Error' };
  }
};
