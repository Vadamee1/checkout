import ProductsClient from "@/src/components/inventory/categories/[categoryId]";
import { getProducts } from "@/src/hooks/inventory/categories/[categoryId]/use-get-products";

export default async function InventoryPage({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;
  const products = await getProducts();

  return <ProductsClient categoryId={categoryId} initialProducts={products} />;
}
