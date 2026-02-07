"use client";

import InventoryClient from "@/src/components/inventory/categories";
import useGetCategories from "@/src/hooks/inventory/categories/use-get-categories";

export default function InventoryPage() {
  const { categories } = useGetCategories();

  return <InventoryClient initialCategories={categories} />;
}
