import ProductForm from '@/components/product/ProductForm';
import ProductList from '@/components/product/ProductList';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import db from '@/lib/db';
import { CodeIcon } from '@radix-ui/react-icons';

export default async function Home() {
  const products = await db.product.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <div>
        <ProductForm />
      </div>
      <Separator className="my-5" />
      <div className="grid grid-cols-5 px-4">
        <div className="col-span-1">left menu</div>
        <div className="col-span-4">
          {products.length === 0 ? (
            <Card className="flex flex-col items-center justify-center gap-3 text-slate-700">
              <CodeIcon className="h-16 w-16" />
              <h1>No Product found!</h1>
            </Card>
          ) : (
            <ProductList products={products} />
          )}
        </div>
      </div>
    </div>
  );
}
