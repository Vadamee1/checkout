"use client";

import AddCategoryDialog from "@/src/components/inventory/categories/AddCategoryDialog";
import CategoryCard from "@/src/components/inventory/categories/CategoryCard";
import useCategories from "@/src/hooks/inventory/categories/use-categories";
import { Category } from "@/src/types/category";

interface InventoryClientProps {
  initialCategories: Category[];
}

export default function InventoryClient({
  initialCategories,
}: InventoryClientProps) {
  const { form, handleSubmit, open, setOpen, categories } =
    useCategories(initialCategories);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Inventario</h1>
        <AddCategoryDialog
          form={form}
          handleSubmit={handleSubmit}
          isOpen={open}
          setIsOpen={setOpen}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard
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
