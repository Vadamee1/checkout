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

export default function UpdateCategoryDialog({
  category,
}: UpdateCategoryDialogProps) {
  return (
    <Dialog>
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

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="destructive" type="button">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="button" onClick={() => console.log("Guardar")}>
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
