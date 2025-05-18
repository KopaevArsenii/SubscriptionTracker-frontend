import { FC } from "react";
import { useForm } from "react-hook-form";
import {
  CreateCategoryFormData,
  createCategorySchema,
} from "@/features/CreateCategoryForm/model/validation.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@mui/material";
import { useCategorySlice } from "@/entities/category/model/useCategorySlice.ts";
import { toast } from "react-toastify";

export const CreateCategoryForm: FC = () => {
  const { createCategory } = useCategorySlice();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCategoryFormData>({
    resolver: zodResolver(createCategorySchema),
  });

  const onSubmit = (data: CreateCategoryFormData) => {
    createCategory(data)
      .then(() => toast.success("Added new category!"))
      .then(() => window.location.reload())
      .catch((e) => toast.error(e.message));
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Name"
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <Button type="submit" variant="contained">
        Create Category
      </Button>
    </form>
  );
};
