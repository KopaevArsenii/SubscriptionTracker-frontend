import { z } from "zod";

export const logInSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LogInFormData = z.infer<typeof logInSchema>;
