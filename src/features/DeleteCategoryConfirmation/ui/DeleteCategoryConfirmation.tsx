import { FC } from "react";
import { Button } from "@mui/material";
import { useCategorySlice } from "@/entities/category/model/useCategorySlice.ts";
import { Category } from "@/entities/category/model/types.ts";
import { toast } from "react-toastify";

interface DeleteCategoryConfirmationProps {
  onClose: () => void;
  category: Category;
}

export const DeleteCategoryConfirmation: FC<
  DeleteCategoryConfirmationProps
> = ({ onClose, category }) => {
  const { deleteCategory } = useCategorySlice();

  const handleYes = () => {
    deleteCategory(category._id)
      .then(() => window.location.reload())
      .catch((e) => toast.error(e.message));
  };

  return (
    <div className="flex flex-col gap-4">
      <div>Are you sure you want delete this category?</div>
      <div className="flex justify-between">
        <Button variant="text" onClick={onClose}>
          No
        </Button>
        <Button variant="text" onClick={handleYes}>
          Yes
        </Button>
      </div>
    </div>
  );
};
