'use client';
import { useCartContext } from '@/context/CartContext';
import { BackpackIcon } from '@radix-ui/react-icons';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import CartItem from './CartItem';
import { Button } from '../ui/button';
import { action_removeAllCartItems } from '@/actions/cart/remove-all-cart-items';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { action_createOrder } from '@/actions/order/create-order';
import { useRouter } from 'next/navigation';

function CartModel() {
  const { optimisticCart, cartProductsSize } = useCartContext();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const handleButton = () => {
    startTransition(async () => {
      await action_removeAllCartItems();
    });
  };
  const totalPrice = optimisticCart.reduce(
    (a, c) => a + c.product.price * c.quantity,
    0
  );

  const handleCheckout = async () => {
    setIsLoading(true);
    const res = await action_createOrder(
      optimisticCart.map((item) => ({
        quantity: item.quantity,
        productId: item.productId,
        price: item.product.price,
        name: item.product.title,
      }))
    );
    if (res.result) {
      await action_removeAllCartItems();
      router.push(res.result);
    }
    if (res.error) {
      toast.error(res.error);
    }

    setIsLoading(false);
  };

  return (
    <Sheet>
      <SheetTrigger className="relative">
        <BackpackIcon className="h-5 w-5" />
        <span className="rounded-full text-xs text-white bg-red-500 py-[1px] px-[4px] absolute -top-2 -right-[6px]">
          {cartProductsSize}
        </span>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Cart Items</SheetTitle>
          <SheetDescription>
            {optimisticCart.length > 0 ? (
              <div className="space-y-2">
                {optimisticCart
                  .filter((val) => val.quantity !== 0)
                  .map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
              </div>
            ) : (
              <p className="text-center pt-6">No item yet!</p>
            )}
            {optimisticCart.length > 0 && (
              <div className="my-2 space-y-2">
                <Button
                  className="w-full "
                  variant="destructive"
                  disabled={isPending}
                  onClick={handleButton}
                >
                  Remove All
                </Button>
                <Button
                  disabled={isLoading}
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-between"
                >
                  <span>{isLoading ? 'Loading...' : 'Checkout'}</span>
                  <span className="font-bold font-mono text-lg">
                    ${totalPrice}
                  </span>
                </Button>
              </div>
            )}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default CartModel;
