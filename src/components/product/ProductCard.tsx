'use client';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductSchema } from '@/lib/schemas';
import { ProductType } from '@/lib/types';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Button } from '../ui/button';
import { useTransition } from 'react';
import { action_createProduct } from '@/actions/product/create-product';
import { toast } from 'sonner';

function ProductCard() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<ProductType>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      stars: '',
    },
  });

  const formSubmit = (formData: ProductType) => {
    startTransition(async () => {
      const res = await action_createProduct(formData);
      if (res.error) {
        toast.error(res.error);
      }
      if (res.success) {
        toast.success(res.success);
      }
    });
  };

  return (
    <Card className="max-w-6xl mx-auto mt-4 mb-2">
      <CardHeader className="py-1">
        <CardTitle className="py-2">Create Product</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(formSubmit)}
            className="flex  items-start justify-between gap-1"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="text" placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="text" placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="shirt">Shirt</SelectItem>
                      <SelectItem value="pant">Pant</SelectItem>
                      <SelectItem value="jacket">Jacket</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stars"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="number" placeholder="Price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
