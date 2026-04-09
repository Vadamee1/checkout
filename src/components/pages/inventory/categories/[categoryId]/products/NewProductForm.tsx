"use client";

import { UseFormReturn } from "react-hook-form";
import { NewProduct } from "@/src/hooks/inventory/categories/[categoryId]/use-products";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";

interface NewProductFormProps {
  form: UseFormReturn<NewProduct>;
}

export default function NewProductForm({ form }: NewProductFormProps) {
  return (
    <Form {...form}>
      <form id="new-product-form" className="space-y-4">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="product-name">Nombre del producto</FormLabel>
              <FormControl>
                <Input id="product-name" placeholder="Nombre..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="price"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="product-price">Precio del producto</FormLabel>
              <FormControl>
                <Input id="product-price" placeholder="Precio..." {...field} />
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
              <FormLabel htmlFor="product-icon">Ícono</FormLabel>
              <FormControl>
                <Input
                  id="product-icon"
                  placeholder="Selecciona un ícono..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="stock"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="product-stock">Cantidad</FormLabel>
              <FormControl>
                <Input
                  id="product-stock"
                  placeholder="Cantidad de productos..."
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
