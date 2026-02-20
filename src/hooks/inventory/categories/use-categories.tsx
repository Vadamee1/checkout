"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Category } from "@/src/types/category";
import { useFetch } from "../../helpers/use-fetch";
import { useNavbar } from "@/src/contexts/admin-nav-bar";
import { Button } from "@/src/components/ui/button";

const formSchema = z.object({
  name: z.string().min(5, "El nombre debe tener al menos 5 caracteres"),
  icon: z.string().min(1, "El ícono es requerido"),
});

export type NewCategory = z.infer<typeof formSchema>;

export default function useCategories() {
  const { jsonFetch } = useFetch();
  const { setTitle, setChildren } = useNavbar();

  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const form = useForm<NewCategory>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      icon: "",
    },
  });

  const handleSubmit = async (data: NewCategory) => {
    const { data: createdCategory } = await jsonFetch(
      "/api/categories",
      "POST",
      data,
    );

    setCategories([...categories, createdCategory]);
    form.reset();
    setOpen(false);
  };

  useEffect(() => {
    setTitle("Inventario: Categorías");
    setChildren(
      <Button size="lg" className="text-lg" onClick={() => setOpen(true)}>
        Agregar categoría
      </Button>,
    );

    return () => {
      setChildren(null);
    };
  }, [setTitle, setChildren]);

  useEffect(() => {
    const getCategories = async () => {
      const { data: categories } = await jsonFetch("/api/categories", "GET");
      setCategories(categories);
    };
    getCategories();
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
