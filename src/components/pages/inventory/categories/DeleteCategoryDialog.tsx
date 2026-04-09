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
import DeleteCategoryById from "@/src/hooks/inventory/categories/[categoryId]/delete-category-by-id";

interface UpdateCategoryDialogProps {
  category: Category;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

export default function DeleteCategoryDialog({
  category,
  setCategories,
}: UpdateCategoryDialogProps) {
  const { deleteOpen, handleSubmit, setDeleteOpen } = DeleteCategoryById(
    category,
    setCategories,
  );

  return (
    <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Eliminar</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold text-xl">
            Eliminar categoría: {category.name}
          </DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que quieres eliminar esta categoría? Esta acción
            eliminará todos los productos asociados a esta categoría.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-0">
          <DialogClose asChild>
            <Button variant="secondary" type="button">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="button" variant="destructive" onClick={handleSubmit}>
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
