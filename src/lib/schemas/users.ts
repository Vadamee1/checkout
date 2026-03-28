import { z } from "zod";

export const User = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(3).max(50),
  rolId: z.number().int(),
});
