"use client";

import { UseFormReturn } from "react-hook-form";
import { NewCategory } from "@/src/hooks/inventory/categories/use-categories";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";

interface UpdateCategoryFormProps {
  form: UseFormReturn<NewCategory>;
}

export default function UpdateCategoryForm({ form }: UpdateCategoryFormProps) {
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
      </form>
    </Form>
  );
}
