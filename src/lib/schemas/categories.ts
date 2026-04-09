import { z } from "zod";

export const Category = z.object({
  name: z
    .string({ error: "Campo name espera un string" })
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(50, "El nombre debe tener como máximo 50 caracteres"),
});
