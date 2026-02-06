"use client";

import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import NewCategoryForm from "./NewCategoryForm";
import { NewCategory } from "@/src/hooks/inventory/categories/use-categories";
import { UseFormReturn } from "react-hook-form";

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
      <DialogTrigger asChild>
        <Button>Agregar categoría</Button>
      </DialogTrigger>
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
