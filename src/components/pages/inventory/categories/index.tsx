"use client";

import useCategories from "@/src/hooks/inventory/categories/use-categories";
import AddCategoryDialog from "./AddCategoryDialog";
import CategoryCard from "./CategoryCard";
import UpdateCategoryDialog from "./UpdateCategoryDialog";
import DeleteCategoryDialog from "./DeleteCategoryDialog";

export default function CategoryList() {
  const { form, handleSubmit, addOpen, setAddOpen, categories } =
    useCategories();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <AddCategoryDialog
          form={form}
          handleSubmit={handleSubmit}
          isOpen={addOpen}
          setIsOpen={setAddOpen}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {categories.map((category) => (
          <div key={category.id}>
            <CategoryCard id={category.id} title={category.name} />
            <div className="grid grid-cols-2 gap-3 mt-2">
              <UpdateCategoryDialog category={category} />
              <DeleteCategoryDialog category={category} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
