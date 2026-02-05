// src/actions/categories.ts
"use server";

import { revalidatePath } from "next/cache";

export type Category = {
  id: string;
  name: string;
  stock: string;
  icon: string;
  available: boolean;
};

// Simulación de base de datos en memoria
let mockCategories: Category[] = [
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

export async function getCategories() {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 500));

  return mockCategories;
}

export async function createCategory(data: { name: string; icon: string }) {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 300));

  const newCategory: Category = {
    id: Date.now().toString(),
    name: data.name,
    icon: data.icon,
    stock: "0",
    available: true,
  };

  mockCategories = [...mockCategories, newCategory];

  revalidatePath("/inventory");
  return newCategory;
}

export async function deleteCategory(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 300));

  mockCategories = mockCategories.filter((cat) => cat.id !== id);

  revalidatePath("/inventory");
  return { success: true };
}
