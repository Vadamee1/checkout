import { useFetch } from "@/src/hooks/helpers/use-fetch";
import { Category } from "@/src/types/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(5, "El nombre debe tener al menos 5 caracteres"),
});

export type UpdateCategory = z.infer<typeof formSchema>;

export default function useCategoryById(
  category: Category,
  setCategories: Dispatch<SetStateAction<Category[]>>,
) {
  const { jsonFetch } = useFetch();

  const [updateOpen, setUpdateOpen] = useState(false);

  const form = useForm<UpdateCategory>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category.name,
    },
  });

  const handleSubmit = async (data: UpdateCategory) => {
    await jsonFetch(`/api/categories/${category.id}`, "PUT", data);

    const updatedCategory = { ...category, ...data };

    setCategories((prevCategories) =>
      prevCategories.map((cat) => {
        return cat.id === updatedCategory.id ? updatedCategory : cat;
      }),
    );

    setUpdateOpen(false);
  };

  return {
    form,
    updateOpen,
    handleSubmit,
    setUpdateOpen,
  };
}
