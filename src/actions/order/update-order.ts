'use server';

import db from '@/lib/db';

export const action_updateOrderStatus = async (orderId: string) => {
  try {
    const order = await db.order.findUnique({ where: { id: orderId } });
    if (!order) {
      return { error: 'Order not found' };
    }

    await db.order.update({ where: { id: order.id }, data: { isPaid: true } });
  } catch (error) {
    console.log(error);
    return { error: 'Order not succeeded' };
  }
};
