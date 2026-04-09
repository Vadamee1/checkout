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
});

export type NewCategory = z.infer<typeof formSchema>;

export default function useCategories() {
  const { jsonFetch } = useFetch();
  const { setTitle, setChildren } = useNavbar();

  const [addOpen, setAddOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const form = useForm<NewCategory>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
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
    setAddOpen(false);
  };

  useEffect(() => {
    setTitle("Inventario: Categorías");
    setChildren(
      <Button size="lg" className="text-lg" onClick={() => setAddOpen(true)}>
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
    addOpen,
    handleSubmit,
    setAddOpen,
    setCategories,
    categories,
  };
}
