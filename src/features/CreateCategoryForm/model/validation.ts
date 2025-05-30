import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export type CreateCategoryFormData = z.infer<typeof createCategorySchema>;
