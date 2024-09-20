'use server';

import db from '@/lib/db';
import { Stripe } from 'stripe';

type Cart = {
  name: string;
  productId: string;
  quantity: number;
  price: number;
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

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

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: formattedOrderItems,
      mode: 'payment',

      success_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/success/${newOrder.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/cancel`,
    });

    return { result: stripeSession.url };
  } catch (error) {
    console.log(error);
    return { error: 'Internal Server Error' };
  }
};
