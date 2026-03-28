import { z } from "zod";

export const Product = z.object({
  name: z.string().min(3),
  price: z.number().positive(),
  stock: z.number().int().nonnegative(),
  categoryId: z.number().int(),
  image: z.file().mime(["image/jpeg", "image/png", "image/jpg"]).optional(),
});
