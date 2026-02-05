"use client";

import { Input } from "../../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { UseFormReturn } from "react-hook-form";
import { NewCategory } from "@/src/hooks/inventory/categories/use-categories";

interface NewCategoryFormProps {
  form: UseFormReturn<NewCategory>;
}

export default function NewCategoryForm({ form }: NewCategoryFormProps) {
  return (
    <Form {...form}>
      <form id="new-category-form" className="space-y-4">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="category-name">
                Nombre de la categoría
              </FormLabel>
              <FormControl>
                <Input id="category-name" placeholder="Nombre..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="icon"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="category-icon">Ícono</FormLabel>
              <FormControl>
                <Input
                  id="category-icon"
                  placeholder="Selecciona un ícono..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
