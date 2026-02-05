"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Product } from "@/src/types/product";

const formSchema = z.object({
  name: z.string().min(5, "El nombre debe tener al menos 5 caracteres"),
  icon: z.string().min(1, "El ícono es requerido"),
  stock: z.string().min(1, "La cantidad de producto es requerido"),
  categoryId: z.string().min(1, "La categoría es requerida"),
});

export type NewProduct = z.infer<typeof formSchema>;

export default function useProducts(
  categoryId: string,
  initialProducts: Product[] = [],
) {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const form = useForm<NewProduct>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      icon: "",
      stock: "",
      categoryId: categoryId,
    },
  });

  async function handleSubmit(data: NewProduct) {
    // Aquí llamarías a tu Server Action
    // const newCategory = await createCategory(data);

    // Actualizar el estado local
    const NewProduct: Product = {
      id: Math.random().toString(),
      name: data.name,
      icon: data.icon,
      stock: data.stock,
      available: true,
      categoryId: data.categoryId,
    };

    setProducts([...products, NewProduct]);
    form.reset();
    setOpen(false);
  }

  return {
    form,
    handleSubmit,
    open,
    setOpen,
    products,
  };
}
