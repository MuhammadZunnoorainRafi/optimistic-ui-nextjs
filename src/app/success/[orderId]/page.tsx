'use client';

import { action_removeAllCartItems } from '@/actions/cart/remove-all-cart-items';
import { action_updateOrderStatus } from '@/actions/order/update-order';
import { ColorWheelIcon, SketchLogoIcon } from '@radix-ui/react-icons';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type Param = {
  orderId: string;
};

function OrderSuccessPage() {
  const [isLoading, setIsLoading] = useState(false);
  const param: Param = useParams();
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    const updateOrderStatus = async () => {
      const res = await action_updateOrderStatus(param.orderId);
      if (res?.error) {
        toast.error(res.error);
        router.push('/error');
      }
    };
    updateOrderStatus();
    setIsLoading(false);
  }, [param.orderId, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center inset-0">
        <ColorWheelIcon className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-[50vh] flex items-center justify-center gap-2 text-emerald-500-500 font-bold text-2xl">
      <h1>Order succeded 👍</h1>
      <SketchLogoIcon className="size-10" />
    </div>
  );
}

export default OrderSuccessPage;
