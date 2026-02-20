"use client";

import { UseFormReturn } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { NewProduct } from "@/src/hooks/inventory/categories/[categoryId]/use-products";
import NewProductForm from "./NewProductForm";

interface AddProductDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  form: UseFormReturn<NewProduct>;
  handleSubmit: (data: NewProduct) => Promise<void>;
}

export default function AddProductDialog({
  isOpen,
  setIsOpen,
  form,
  handleSubmit,
}: AddProductDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold text-xl">
            Nuevo producto
          </DialogTitle>
          <DialogDescription>Crea un nuevo producto.</DialogDescription>
        </DialogHeader>

        <NewProductForm form={form} />

        <DialogFooter>
          <Button
            variant="destructive"
            type="button"
            onClick={() => setIsOpen(false)}
          >
            Cancelar
          </Button>
          <Button type="button" onClick={form.handleSubmit(handleSubmit)}>
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
