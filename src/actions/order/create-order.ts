'use server';

import db from '@/lib/db';

type Cart = {
  name: string;
  productId: string;
  quantity: number;
  price: number;
};

export const action_createOrder = async (cart: Cart[]) => {
  if (cart.length === 0) {
    return { error: 'Cart is empty' };
  }

  try {
    const newOrder = await db.order.create({
      data: {
        OrderItem: {
          createMany: {
            data: cart.map((val) => ({
              quantity: val.quantity,
              productId: val.productId,
            })),
          },
        },
      },
    });

    if (!newOrder) {
      return { error: 'Order not created' };
    }

    const formattedOrderItems = cart.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
  } catch (error) {
    console.log(error);
    return { error: 'Internal Server Error' };
  }
};
