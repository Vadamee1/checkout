"use client";

import AddCategoryDialog from "@/src/components/inventory/categories/AddCategoryDialog";
import InventoryCard from "@/src/components/inventory/categories/InventoryCard";
import { useState } from "react";

export type Category = {
  id: string;
  name: string;
  stock: string;
  icon: string;
  available: boolean;
};

const data: Category[] = [
  { id: "0", name: "Cerveza", stock: "150", icon: "🍺", available: true },
  {
    id: "1",
    name: "Bebidas preparadas",
    stock: "200",
    icon: "🍋",
    available: true,
  },
  { id: "2", name: "Refresco", stock: "80", icon: "🥤", available: true },
  { id: "3", name: "Snacks", stock: "120", icon: "🍪", available: false },
  { id: "4", name: "Cigarros", stock: "60", icon: "🚬", available: true },
];

export default function InventoryPage() {
  const [categories, setCategories] = useState<Category[]>(data);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Inventario</h1>
        <AddCategoryDialog setCategories={setCategories} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <InventoryCard
            id={category.id}
            key={category.id}
            title={category.name}
            available={category.available}
            icon={category.icon}
          />
        ))}
      </div>
    </div>
  );
}
