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

interface UpdateCategoryDialogProps {
  category: Category;
}

export default function DeleteCategoryDialog({
  category,
}: UpdateCategoryDialogProps) {
  return (
    <Dialog>
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

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="destructive" type="button">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="button" onClick={() => console.log("Eliminar")}>
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
