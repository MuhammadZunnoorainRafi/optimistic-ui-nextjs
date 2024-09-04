'use server';

import { ProductSchema } from '@/lib/schemas';
import { ProductType } from '@/lib/types';

export const action_createProduct = async (formData: ProductType) => {
  const validation = ProductSchema.safeParse(formData);
  if (!validation.success) {
  }
};
