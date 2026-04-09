import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Category } from "@/src/types/category";
import { DialogClose, DialogTrigger } from "@radix-ui/react-dialog";
import useCategoryById from "@/src/hooks/inventory/categories/[categoryId]/use-category-by-id";
import UpdateCategoryForm from "./UpdateCategoryForm";

interface UpdateCategoryDialogProps {
  category: Category;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

export default function UpdateCategoryDialog({
  category,
  setCategories,
}: UpdateCategoryDialogProps) {
  const { form, handleSubmit, updateOpen, setUpdateOpen } = useCategoryById(
    category,
    setCategories,
  );

  return (
    <Dialog open={updateOpen} onOpenChange={setUpdateOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Editar</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold text-xl">
            Editar categoría: {category.name}
          </DialogTitle>
          <DialogDescription>
            Actualiza el nombre de la categoría.
          </DialogDescription>
        </DialogHeader>

        <UpdateCategoryForm form={form} />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="destructive" type="button">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="button" onClick={form.handleSubmit(handleSubmit)}>
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
