'use server';

import db from '@/lib/db';
import { constructSearchQueries } from '@/lib/utils';

type Query = {
  page?: number;
  search?: string;
  category?: string;
  stars?: string[];
};

export const action_getProduct = async ({
  page = 1,
  search,
  category,
  stars,
}: Query) => {
  const where = constructSearchQueries({ search, category, stars });

  page = page <= 0 ? 1 : search ? 1 : page;
  const limit = 3;
  const skip = (page - 1) * limit;
  const totalProducts = await db.product.count({ where });
  const pages = Math.ceil(totalProducts / limit);
  const products = await db.product.findMany({
    where,
    include: { Like: true },
    orderBy: { createdAt: 'desc' },
    take: limit,
    skip,
  });
  return { products, pages };
};
