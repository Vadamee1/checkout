"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Product } from "@/src/types/product";
import { useFetch } from "@/src/hooks/helpers/use-fetch";
import { useNavbar } from "@/src/contexts/admin-nav-bar";
import { Button } from "@/src/components/ui/button";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(5, "El nombre debe tener al menos 5 caracteres"),
  price: z.string().min(0, "El precio debe ser un número positivo"),
  icon: z.string().min(1, "El ícono es requerido"),
  stock: z.string().min(1, "La cantidad de producto es requerido"),
  categoryId: z.string().min(1, "La categoría es requerida"),
});

export type NewProduct = z.infer<typeof formSchema>;

export default function useProducts(categoryId: string) {
  const { jsonFetch } = useFetch();
  const { setTitle, setChildren } = useNavbar();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryName, setCategoryName] = useState("");

  const form = useForm<NewProduct>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: "",
      icon: "",
      stock: "",
      categoryId: categoryId,
    },
  });

  const handleCloseDialog = () => {
    setOpen(false);
    form.reset();
  };

  const handleSubmit = async (data: NewProduct) => {
    const { data: createdProduct } = await jsonFetch(
      "/api/product",
      "POST",
      data,
    );

    setProducts([...products, createdProduct]);
    handleCloseDialog();
  };

  useEffect(() => {
    const getProducts = async () => {
      const { data } = await jsonFetch(`/api/categories/${categoryId}`, "GET");
      console.log("Fetched products", { data });
      if (data) {
        setProducts(data);
        setCategoryName(data.name);
      }
    };
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log("Products state updated", { products });

  useEffect(() => {
    setTitle(`Inventario: ${categoryName}`);
    setChildren(
      <>
        <Button
          size="lg"
          className="text-lg"
          variant="secondary"
          onClick={() => router.push("/inventory/categories")}
        >
          Regresar
        </Button>
        <Button size="lg" className="text-lg" onClick={() => setOpen(true)}>
          Agregar categoría
        </Button>
        ,
      </>,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setTitle, categoryName, setChildren]);

  return {
    form,
    handleSubmit,
    open,
    handleCloseDialog,
    setOpen,
    products,
  };
}
