import { z } from "zod";

export const signUpSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
