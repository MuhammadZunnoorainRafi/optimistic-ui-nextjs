import ProductCard from '@/components/product/ProductCard';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div>
      <div>
        <ProductCard />
      </div>
      <Separator className="my-5" />
      <div className="grid grid-cols-5">
        <div className="col-span-1">left menu</div>
        <div className="col-span-4">rright</div>
      </div>
    </div>
  );
}
