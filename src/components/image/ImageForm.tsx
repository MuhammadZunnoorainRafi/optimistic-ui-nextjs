'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { object, z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Button } from '../ui/button';
import { CldImage, CldUploadWidget } from 'next-cloudinary';
import { toast } from 'sonner';
import { useState } from 'react';

const ImageFormSchema = z.object({
  images: z.array(z.string()).min(1, 'Select atleast one image'),
});

type ImageFormType = z.infer<typeof ImageFormSchema>;

function ImageForm() {
  const [publicIdArray, setPublicIdArray] = useState<string[]>([]);
  const form = useForm<ImageFormType>({
    resolver: zodResolver(ImageFormSchema),
    defaultValues: { images: [] },
  });

  const formSubmit = async (formdata: any) => {
    console.log(formdata);
  };
  // console.log(publicIdArray);
  return (
    <div className="max-w-6xl mx-auto space-y-3">
      <h1 className="text-center font-bold text-2xl">Image Files Upload</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(formSubmit)}>
          <FormField
            control={form.control}
            name="images"
            render={() => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <CldUploadWidget
                    uploadPreset={
                      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                    }
                    // signatureEndpoint="/api/sign-cloudinary-params"
                    options={{ multiple: true }}
                    onError={(error) => {
                      toast.error(error?.toString());
                    }}
                    onSuccess={(result) => {
                      if (
                        typeof result.info === 'object' &&
                        'public_id' in result.info
                      ) {
                        const image = result.info.public_id;
                        setPublicIdArray((prev) => [...prev, image]);
                        console.log({ result });
                      }
                    }}
                  >
                    {({ open }) => (
                      <Button onClick={() => open()}>Select Image</Button>
                    )}
                  </CldUploadWidget>
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
      <div>
        {publicIdArray.map((val) => {
          return (
            <CldImage
              className="hover:opacity-40"
              onClick={() =>
                setPublicIdArray(() =>
                  publicIdArray.filter((img) => img !== val)
                )
              }
              key={val}
              src={val}
              width={200}
              height={200}
              alt="cloudinary image error"
            />
          );
        })}
      </div>
    </div>
  );
}

export default ImageForm;
