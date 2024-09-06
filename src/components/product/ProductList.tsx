import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Product } from '@prisma/client';
import ProductItem from './ProductItem';
import { ProductWithLikes } from '@/lib/types';

type Props = {
  products: ProductWithLikes[];
};

function ProductList({ products }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Products</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </CardContent>
    </Card>
  );
}

export default ProductList;
