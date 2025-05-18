import { FC, useEffect, useState } from "react";
import { Layout } from "@/widgets/Layouts/Layout.tsx";
import { useCategorySlice } from "@/entities/category/model/useCategorySlice.ts";
import { CategoryCard } from "@/entities/category/ui/CategoryCard.tsx";
import { toast } from "react-toastify";
import { Button, TextField } from "@mui/material";
import { CreateCategoryForm } from "@/features/CreateCategoryForm/ui/CreateCategoryForm.tsx";
import { AppModal } from "@/shared/components/AppModal.tsx";
import { Category } from "@/entities/category/model/types.ts";
import { EditCategoryForm } from "@/features/EditCategoryForm/ui/EditCategoryForm.tsx";
import { DeleteCategoryConfirmation } from "@/features/DeleteCategoryConfirmation/ui/DeleteCategoryConfirmation.tsx";

export const CategoryPage: FC = () => {
  const { categories, getCategories } = useCategorySlice();
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [search, setSearch] = useState("");

  const openCreateModal = () => setCreateModal(true);
  const closeCreateModal = () => setCreateModal(false);
  const openEditModal = (category: Category) => {
    setSelectedCategory(category);
    setEditModal(true);
  };
  const closeEditModal = () => {
    setSelectedCategory(null);
    setEditModal(false);
  };
  const openDeleteModal = (category: Category) => {
    setSelectedCategory(category);
    setDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setSelectedCategory(null);
    setDeleteModal(false);
  };

  useEffect(() => {
    getCategories().catch((e) => toast.error(e.message));
  }, []);

  return (
    <Layout>
      <AppModal open={createModal} onClose={closeCreateModal}>
        <h2 className="text-xl font-semibold mb-4">Create Category</h2>
        <CreateCategoryForm />
      </AppModal>
      <AppModal open={editModal} onClose={closeEditModal}>
        <h2 className="text-xl font-semibold mb-4">Edit Category</h2>
        <EditCategoryForm category={selectedCategory as Category} />
      </AppModal>
      <AppModal open={deleteModal} onClose={closeDeleteModal}>
        <h2 className="text-xl font-semibold mb-4">Delete Category</h2>
        <DeleteCategoryConfirmation
          category={selectedCategory as Category}
          onClose={closeDeleteModal}
        />
      </AppModal>
      <div className="flex justify-between p-4">
        <TextField
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={openCreateModal}>Create</Button>
      </div>
      <div className="flex flex-wrap gap-4 p-4">
        {categories
          .filter((category) =>
            category.name.toLowerCase().includes(search.toLowerCase()),
          )
          .map((category) => (
            <CategoryCard
              onEdit={() => openEditModal(category)}
              onDelete={() => openDeleteModal(category)}
              key={category._id}
              category={category}
            />
          ))}
      </div>
    </Layout>
  );
};
