"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Category } from "@/src/types/category";

const formSchema = z.object({
  name: z.string().min(5, "El nombre debe tener al menos 5 caracteres"),
  icon: z.string().min(1, "El ícono es requerido"),
});

export type NewCategory = z.infer<typeof formSchema>;

export default function useCategories(initialCategories: Category[] = []) {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  const form = useForm<NewCategory>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      icon: "",
    },
  });

  async function handleSubmit(data: NewCategory) {
    // Aquí llamarías a tu Server Action
    // const newCategory = await createCategory(data);

    // Actualizar el estado local
    const newCategory: Category = {
      id: Math.random().toString(),
      name: data.name,
      icon: data.icon,
      stock: "0",
      available: true,
    };

    setCategories([...categories, newCategory]);
    form.reset();
    setOpen(false);
  }

  return {
    form,
    handleSubmit,
    open,
    setOpen,
    categories,
  };
}
