"use client";

import { DialogTitle } from "@radix-ui/react-dialog";
import NewCategoryForm from "./NewCategoryForm";
import { NewCategory } from "@/src/hooks/inventory/categories/use-categories";
import { UseFormReturn } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";

interface AddCategoryDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  form: UseFormReturn<NewCategory>;
  handleSubmit: (data: NewCategory) => Promise<void>;
}

export default function AddCategoryDialog({
  isOpen,
  setIsOpen,
  form,
  handleSubmit,
}: AddCategoryDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold text-xl">
            Nueva categoría
          </DialogTitle>
          <DialogDescription>
            Crea una nueva categoría para organizar tus productos.
          </DialogDescription>
        </DialogHeader>

        <NewCategoryForm form={form} />

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
