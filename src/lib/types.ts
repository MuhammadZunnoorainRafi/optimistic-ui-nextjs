import { z } from 'zod';
import { LogSchema, ProductSchema, RegSchema } from './schemas';
import { Like, Product } from '@prisma/client';

export type LogType = z.infer<typeof LogSchema>;
export type RegType = z.infer<typeof RegSchema>;

export type UserType = RegType & {
  id: string;
};

export type ProductType = z.infer<typeof ProductSchema>;

export type ProductTypeDb = {
  id: string;
} & ProductType;

export type ProductWithLikes = Product & { Like: Like[] };
