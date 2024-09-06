import { type ClassValue, clsx } from 'clsx';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const constructSearchQueries = (queryParams: any) => {
  let where: any = { AND: [] };

  if (queryParams.search) {
    where.AND.push({
      title: { contains: queryParams.search, mode: 'insensitive' },
    });
  }

  if (queryParams.category) {
    where.AND.push({
      category: { contains: queryParams.category },
    });
  }
  if (queryParams.stars) {
    where.AND.push({
      stars: { in: queryParams.stars },
    });
  }

  return where;
};
