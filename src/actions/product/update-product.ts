'use server';

import { getUserServer } from '@/hooks/getUserServert';
import db from '@/lib/db';
import { ProductSchema } from '@/lib/schemas';
import { ProductType } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export const action_updateProduct = async (
  productId: string,
  formData: ProductType
) => {
  const user = await getUserServer();
  if (!user) {
    return { error: 'Unauthorized' };
  }

  const validation = ProductSchema.safeParse(formData);
  if (!validation.success) {
    return { error: 'Invalid fields' };
  }

  try {
    const updatedProduct = await db.product.update({
      where: { id: productId, userId: user.id },
      data: validation.data,
    });

    if (updatedProduct) {
      revalidatePath('/');
      return { success: 'Product is updated' };
    } else {
      return { error: 'Product is not updated' };
    }
  } catch (error) {
    console.log(error);
    return { error: 'Internal Server Error' };
  }
};
