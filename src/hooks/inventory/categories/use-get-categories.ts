"use client";

import { useEffect, useState } from "react";
import { useFetch } from "../../helpers/use-fetch";

export type Category = {
  id: string;
  name: string;
  stock: string;
  icon: string;
  available: boolean;
};

export default function useGetCategories() {
  const { jsonFetch } = useFetch();

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      const { data: categories } = await jsonFetch("/api/categories", "GET");
      setCategories(categories);
    };
    getCategories();
  }, []);

  return { categories };
}
