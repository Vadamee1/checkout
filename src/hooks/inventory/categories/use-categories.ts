"use client";

import { useEffect, useState } from "react";
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
  console.log(initialCategories);
  console.log(categories);

  const form = useForm<NewCategory>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      icon: "",
    },
  });

  async function handleSubmit(data: NewCategory) {
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

  useEffect(() => {
    setCategories(initialCategories);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    form,
    open,
    handleSubmit,
    setOpen,
    categories,
  };
}
