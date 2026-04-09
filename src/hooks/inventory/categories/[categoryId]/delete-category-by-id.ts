import { useFetch } from "@/src/hooks/helpers/use-fetch";
import { Category } from "@/src/types/category";
import { Dispatch, SetStateAction, useState } from "react";

export default function DeleteCategoryById(
  category: Category,
  setCategories: Dispatch<SetStateAction<Category[]>>,
) {
  const { jsonFetch } = useFetch();

  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleSubmit = async () => {
    const result = await jsonFetch(`/api/categories/${category.id}`, "DELETE");
    if (!result) return;

    setCategories((prevCategories) =>
      prevCategories.filter((cat) => cat.id !== category.id),
    );

    setDeleteOpen(false);
  };

  return {
    deleteOpen,
    handleSubmit,
    setDeleteOpen,
  };
}
