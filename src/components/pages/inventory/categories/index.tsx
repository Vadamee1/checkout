"use client";

import useCategories from "@/src/hooks/inventory/categories/use-categories";
import AddCategoryDialog from "./AddCategoryDialog";
import CategoryCard from "./CategoryCard";

export default function CategoryList() {
  const { form, handleSubmit, open, setOpen, categories } = useCategories();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <AddCategoryDialog
          form={form}
          handleSubmit={handleSubmit}
          isOpen={open}
          setIsOpen={setOpen}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <CategoryCard
            id={category.id}
            key={category.id}
            title={category.name}
          />
        ))}
      </div>
    </div>
  );
}
