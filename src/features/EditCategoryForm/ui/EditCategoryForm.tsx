import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@mui/material";
import { useCategorySlice } from "@/entities/category/model/useCategorySlice.ts";
import { toast } from "react-toastify";
import { Category } from "@/entities/category/model/types.ts";
import {
  EditCategoryFormData,
  editCategorySchema,
} from "@/features/EditCategoryForm/model/validation.ts";

interface EditCategoryFormProps {
  category: Category;
}

export const EditCategoryForm: FC<EditCategoryFormProps> = ({ category }) => {
  const { updateCategory } = useCategorySlice();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditCategoryFormData>({
    resolver: zodResolver(editCategorySchema),
  });

  const onSubmit = (data: EditCategoryFormData) => {
    updateCategory(data, category._id)
      .then(() => toast.success("Updated category!"))
      .then(() => window.location.reload())
      .catch((e) => toast.error(e.message));
  };

  useEffect(() => {
    setValue("name", category.name);
  }, [category]);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Name"
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <Button type="submit" variant="contained">
        Update Category
      </Button>
    </form>
  );
};
