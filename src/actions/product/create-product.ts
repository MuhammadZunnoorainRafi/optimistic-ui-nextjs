'use server';

import { getUserServer } from '@/hooks/getUserServert';
import db from '@/lib/db';
import { ProductSchema } from '@/lib/schemas';
import { ProductType } from '@/lib/types';

export const action_createProduct = async (formData: ProductType) => {
  const user = await getUserServer();
  if (!user) {
    return { error: 'Unauthorized' };
  }

  const validation = ProductSchema.safeParse(formData);
  if (!validation.success) {
    return { error: 'Invalid fields' };
  }

  try {
    const newProduct = await db.product.create({
      data: { userId: user.id, ...validation.data },
    });
    if (newProduct) {
      return { success: 'Product created!' };
    } else {
      return { error: 'Product not created' };
    }
  } catch (error) {
    console.log(error);
    return { error: 'Internal Server Error' };
  }
};
