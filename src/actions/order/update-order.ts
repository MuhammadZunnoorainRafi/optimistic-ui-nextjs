'use server';

import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const action_updateOrderStatus = async (orderId: string) => {
  try {
    const order = await db.order.findUnique({ where: { id: orderId } });
    if (!order) {
      return { error: 'Order not found' };
    }
    const updatedOrder = await db.order.update({
      where: { id: order.id },
      data: { isPaid: true },
    });
    if (!updatedOrder) {
      return { error: 'Order status not updated' };
    }
    revalidatePath(`/success/${orderId}`);
  } catch (error) {
    console.log(error);
    return { error: 'Order not succeeded' };
  }
};
