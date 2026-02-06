"use client";

import ProductCard from "./ProductCard";
import useProducts from "@/src/hooks/inventory/categories/[categoryId]/use-products";
import AddProductDialog from "./AddProductDialog";
import { Product } from "@/src/types/product";

interface ProductsClientProps {
  categoryId: string;
  initialProducts: Product[];
}

export default function ProductsClient({
  categoryId,
  initialProducts,
}: ProductsClientProps) {
  const { form, handleSubmit, open, setOpen, products } = useProducts(
    categoryId,
    initialProducts,
  );

  console.log("ProductsClient rendered with products:", products);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Productos</h1>
        <AddProductDialog
          form={form}
          handleSubmit={handleSubmit}
          isOpen={open}
          setIsOpen={setOpen}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            stock={product.stock}
            key={product.id}
            title={product.name}
            available={product.available}
            icon={product.icon}
          />
        ))}
      </div>
    </div>
  );
}
