'use server';

import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const action_removeAllCartItems = async () => {
  await db.cart.deleteMany({});
  revalidatePath('/');
};
