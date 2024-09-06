'use client';
import { Product } from '@prisma/client';
import {
  HeartFilledIcon,
  HeartIcon,
  Pencil2Icon,
  ReloadIcon,
  SectionIcon,
  StarFilledIcon,
  TrashIcon,
} from '@radix-ui/react-icons';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { useState, useTransition } from 'react';
import ProductForm from './ProductForm';
import { action_deleteProduct } from '@/actions/product/delete-product';
import { toast } from 'sonner';
import { action_addLike } from '@/actions/like/add-like';
import { ProductWithLikes } from '@/lib/types';
import { useGetUserClient } from '@/hooks/getUserClient';

type Props = {
  product: ProductWithLikes;
};

function ProductItem({ product }: Props) {
  const user = useGetUserClient();
  const [isEdit, setIsEdit] = useState(false);
  const [isPending, startTransition] = useTransition();

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsEdit(false);
    }
  };

  const deleteProduct = () => {
    startTransition(async () => {
      const res = await action_deleteProduct(product.id);
      if (res.error) {
        toast.error(res.error);
      }
      if (res.success) {
        toast.error(res.success);
      }
    });
  };

  const likeClick = async () => {
    const res = await action_addLike(product.id);
    if (res?.error) {
      toast.error(res.error);
    }
  };

  document.addEventListener('keydown', onKeyDown);

  if (isEdit) {
    return <ProductForm product={product} setIsEdit={setIsEdit} />;
  }

  return (
    <Card className="flex items-center justify-between p-2">
      <div className="flex-[0.4]">
        <h1 className="font-semibold">{product.title}</h1>
        <p className="text-sm text-slate-900">{product.description}</p>
      </div>
      <div className="flex items-center justify-center gap-1 flex-[0.1]">
        <SectionIcon className="h-5 w-5" />
        <p className="uppercase">{product.category}</p>
      </div>
      <div className="flex items-center justify-center gap-1 flex-[0.1]">
        <StarFilledIcon className="h-5 w-5" />
        <p>{product.stars}</p>
      </div>
      <div className="flex-[0.1]">$ {product.price}</div>
      <Button
        asChild
        size="icon"
        variant="ghost"
        className="hover:cursor-pointer"
        onClick={likeClick}
      >
        <div className="flex items-center justify-center gap-1">
          {product.Like.find(
            (val) => val.userId === user?.id && val.productId === product.id
          ) ? (
            <HeartFilledIcon className="h-4 w-4 text-red-500" />
          ) : (
            <HeartIcon className="h-4 w-4 text-red-500" />
          )}

          <p className="text-sm">{product.Like.length}</p>
        </div>
      </Button>
      <Button
        asChild
        size="icon"
        variant="ghost"
        className="hover:cursor-pointer"
        onClick={() => !isPending && setIsEdit(true)}
      >
        <div className="flex items-center justify-center gap-1">
          <Pencil2Icon className="h-4 w-4 " />
        </div>
      </Button>
      <Button
        disabled={isPending}
        onClick={deleteProduct}
        asChild
        size="icon"
        variant="ghost"
        className="hover:cursor-pointer hover:bg-red-100"
      >
        <div className="flex items-center justify-center gap-1">
          {isPending ? (
            <ReloadIcon className="h-4 w-4 animate-spin" />
          ) : (
            <TrashIcon className="h-4 w-4" />
          )}
        </div>
      </Button>
      <Button className="bg-blue-700 hover:bg-blue-600 flex-[0.1]">
        Add to Cart
      </Button>
    </Card>
  );
}

export default ProductItem;
