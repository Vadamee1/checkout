import InventoryClient from "@/src/components/inventory/categories";
import { getCategories } from "@/src/hooks/inventory/categories/use-get-categories";

export default async function InventoryPage() {
  const categories = await getCategories();

  return <InventoryClient initialCategories={categories} />;
}
