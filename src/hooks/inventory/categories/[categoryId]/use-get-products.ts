// src/actions/categories.ts
"use server";

import { Product } from "@/src/types/product";
import { revalidatePath } from "next/cache";

// Simulación de base de datos en memoria
let mockProducts: Product[] = [
  {
    id: "0",
    name: "Victoria 355ml",
    stock: "24",
    icon: "🏆",
    available: true,
    categoryId: "1",
  },
  {
    id: "1",
    name: "Indio 355ml",
    stock: "12",
    icon: "🪷",
    available: true,
    categoryId: "1",
  },
  {
    id: "2",
    name: "Corona 355ml",
    stock: "6",
    icon: "👑",
    available: true,
    categoryId: "1",
  },
];

export async function getProducts() {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 500));

  return mockProducts;
}

export async function createCategory(data: { name: string; icon: string }) {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 300));

  const newProduct: Product = {
    id: Date.now().toString(),
    name: data.name,
    icon: data.icon,
    stock: "0",
    available: true,
    categoryId: "1",
  };

  mockProducts = [...mockProducts, newProduct];

  revalidatePath("/inventory");
  return newProduct;
}

export async function deleteCategory(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 300));

  mockProducts = mockProducts.filter((product) => product.id !== id);

  revalidatePath("/inventory");
  return { success: true };
}
