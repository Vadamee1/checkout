"use client";

import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import NewCategoryForm from "./NewCategoryForm";
import useNewCategoryForm from "@/src/hooks/inventory/categories/use-new-category";
import { Category } from "@/src/app/inventory/categories/page";

interface AddCategoryDialogProps {
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

export default function AddCategoryDialog({
  setCategories,
}: AddCategoryDialogProps) {
  const { form, handleSubmit, open, setOpen } = useNewCategoryForm({
    setCategories,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Agregar categoría</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold text-xl text-center">
            Nueva categoría
          </DialogTitle>
        </DialogHeader>

        <NewCategoryForm form={form} />

        <DialogFooter>
          <Button
            variant="destructive"
            type="button"
            onClick={() => setOpen(false)}
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
