import ProductsList from "@/src/components/pages/inventory/categories/[categoryId]/products";

export default async function InventoryPage({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;

  return <ProductsList categoryId={categoryId} />;
}
