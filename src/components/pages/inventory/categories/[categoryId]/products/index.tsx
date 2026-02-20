"use client";

import ProductCard from "./ProductCard";
import useProducts from "@/src/hooks/inventory/categories/[categoryId]/use-products";
import AddProductDialog from "./AddProductDialog";

interface ProductsListProps {
  categoryId: string;
}

export default function ProductsList({ categoryId }: ProductsListProps) {
  const { form, handleSubmit, open, setOpen, products } =
    useProducts(categoryId);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <AddProductDialog
          form={form}
          handleSubmit={handleSubmit}
          isOpen={open}
          setIsOpen={setOpen}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products &&
          products.map((product) => (
            <ProductCard
              stock={product.stock}
              key={product.id}
              title={product.name}
              icon={product.icon}
            />
          ))}
      </div>
    </div>
  );
}
