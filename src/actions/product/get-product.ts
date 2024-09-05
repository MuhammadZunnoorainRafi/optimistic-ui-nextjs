'use server';

import db from '@/lib/db';

type Query = {
  page?: number;
  search?: string;
};

export const action_getProduct = async ({ page = 1, search }: Query) => {
  page = page <= 0 ? 1 : page;
  const limit = 3;
  const skip = (page - 1) * limit;
  const totalProducts = await db.product.count();
  const pages = Math.ceil(totalProducts / limit);
  const products = await db.product.findMany({
    where: { title: { contains: search, mode: 'insensitive' } },
    orderBy: { createdAt: 'desc' },
    take: limit,
    skip,
  });
  return { products, pages };
};
