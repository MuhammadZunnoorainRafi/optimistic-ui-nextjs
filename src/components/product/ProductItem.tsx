import { Product } from '@prisma/client';
import { SectionIcon, StarFilledIcon } from '@radix-ui/react-icons';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

type Props = {
  product: Product;
};

function ProductItem({ product }: Props) {
  return (
    <Card>
      <CardHeader className="py-1">
        <CardTitle className="py-2">{product.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{product.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex items-center justify-around">
        <div className="flex items-center justify-center gap-1">
          <SectionIcon className="h-3 w-3" />
          <p className="uppercase text-sm">{product.category}</p>
        </div>
        <div className="flex items-center justify-center gap-1">
          <StarFilledIcon className="h-3 w-3" />
          <p className="text-sm">{product.stars}</p>
        </div>
      </CardFooter>
    </Card>
  );
}

export default ProductItem;
