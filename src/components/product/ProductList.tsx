'use client';
import { ProductWithLikes } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import ProductItem from './ProductItem';
import { useProductContext } from '@/context/ProductContext';

type Props = {
  products: ProductWithLikes[];
};

function ProductList({ products }: Props) {
  const { optimisticProduct } = useProductContext();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Products</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {optimisticProduct.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </CardContent>
    </Card>
  );
}

export default ProductList;
