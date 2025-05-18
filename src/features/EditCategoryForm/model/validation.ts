import { z } from "zod";

export const editCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export type EditCategoryFormData = z.infer<typeof editCategorySchema>;
