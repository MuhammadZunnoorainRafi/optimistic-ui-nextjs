'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const ImageFormSchema = z.object({
  images: z.instanceof(FileList, { message: 'Select atleast one image' }),
});

type ImageFormType = z.infer<typeof ImageFormSchema>;

function ImageForm() {
  const form = useForm<ImageFormType>({
    resolver: zodResolver(ImageFormSchema),
  });
  return (
    <div className="max-w-6xl mx-auto space-y-3">
      <h1 className="text-center font-bold text-2xl">Image Files Upload</h1>
      <Form {...form}>
        <form action="">
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    multiple={true}
                    onChange={(event) => {
                      field.onChange(event.target.files || null);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="inline-block mx-auto" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default ImageForm;
