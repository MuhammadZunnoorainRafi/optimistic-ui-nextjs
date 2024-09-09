import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import db from '@/lib/db';
import { BackpackIcon } from '@radix-ui/react-icons';
import CartItem from './CartItem';

async function Cart() {
  const cartProducts = await db.cart.findMany({
    include: { product: true },
    orderBy: { createdAt: 'desc' },
  });
  const cartProductsSize = cartProducts.reduce((a, c) => a + c.quantity, 0);
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
            {cartProducts.length > 0 ? (
              <div className="space-y-2">
                {cartProducts.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <p className="text-center pt-6">No item yet!</p>
            )}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default Cart;
