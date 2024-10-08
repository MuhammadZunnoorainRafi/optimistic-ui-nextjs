import { action_getProduct } from '@/actions/product/get-product';
import Filters from '@/components/filter/Filters';
import ProductForm from '@/components/product/ProductForm';
import ProductList from '@/components/product/ProductList';
import Pagination from '@/components/shared/Pagination';
import { Card } from '@/components/ui/card';
import { ProductContextProvider } from '@/context/ProductContext';
import { CodeIcon } from '@radix-ui/react-icons';

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const currentPage = +(searchParams.page || 1);
  const search = searchParams.search?.toString();
  const category = searchParams.category?.toString();
  const stars = searchParams.stars?.toString().split('-');
  const { products, pages } = await action_getProduct({
    page: currentPage,
    search,
    category,
    stars,
  });

  return (
    <ProductContextProvider products={products}>
      <div>
        {products.length === 0 ? (
          <Card className="flex flex-col items-center justify-center gap-3 text-slate-700">
            <CodeIcon className="h-16 w-16" />
            <h1>No Product found!</h1>
          </Card>
        ) : (
          <div>
            <ProductForm />
            <ProductList products={products} />
          </div>
        )}
      </div>
      <div>
        <Pagination totalPages={pages} currentPage={currentPage} />
      </div>
    </ProductContextProvider>
  );
}
