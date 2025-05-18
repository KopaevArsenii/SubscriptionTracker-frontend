import { FC } from "react";
import { Category } from "@/entities/category/model/types.ts";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface CategoryCard {
  category: Category;
  onEdit: () => void;
  onDelete: () => void;
}

export const CategoryCard: FC<CategoryCard> = ({
  category,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="relative rounded-xl p-2 bg-blue-300 flex items-center gap-2">
      <div className="p-2 text-md">{category.name}</div>
      <IconButton onClick={onEdit}>
        <EditIcon />
      </IconButton>
      <IconButton onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};
