"use client";

import { Category } from "@/src/app/inventory/categories/page";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(5, "El nombre debe tener al menos 5 caracteres"),
  icon: z.string().min(1, "El ícono es requerido"),
});

export type NewCategory = z.infer<typeof formSchema>;

interface UseNewCategoryFormProps {
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

export default function useNewCategoryForm({
  setCategories,
}: UseNewCategoryFormProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<NewCategory>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      icon: "",
    },
  });

  const handleSubmit = async (data: NewCategory) => {
    setCategories((prevCategories) => [
      ...prevCategories,
      {
        id: (prevCategories.length + 1).toString(),
        name: data.name,
        icon: data.icon,
        stock: "0",
        available: false,
      },
    ]);
    setOpen(false);
  };

  return {
    open,
    form,
    setOpen,
    handleSubmit,
  };
}
