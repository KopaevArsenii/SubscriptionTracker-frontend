import {
  Category,
  CreateCategoryRequest,
} from "@/entities/category/model/types.ts";
import { create } from "zustand";
import { api } from "@/shared/api";

interface CategoryState {
  categories: Category[];
  getCategories: () => Promise<void>;
  createCategory: (data: CreateCategoryRequest) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  updateCategory: (data: CreateCategoryRequest, id: string) => Promise<void>;
}

const initialState = {
  categories: [],
};

export const useCategorySlice = create<CategoryState>()((set) => ({
  ...initialState,
  getCategories: () =>
    api
      .get<Category[]>("/categories")
      .then((data) => set({ categories: data.data }))
      .catch((error) => {
        throw new Error(
          error?.response?.data?.message || "Error while getting categories!",
        );
      }),
  createCategory: (data) =>
    api
      .post("/categories", data)
      .then(() => {})
      .catch((error) => {
        throw new Error(
          error?.response?.data?.message || "Error while adding category",
        );
      }),
  deleteCategory: (id) =>
    api
      .delete(`/categories/${id}`)
      .then(() => {})
      .catch((error) => {
        throw new Error(
          error?.response?.data?.message || "Error while deleting category!",
        );
      }),
  updateCategory: (data, id) =>
    api
      .put(`/categories/${id}`, data)
      .then(() => {})
      .catch((error) => {
        throw new Error(
          error?.response?.data?.message || "Error while updating category!",
        );
      }),
}));
