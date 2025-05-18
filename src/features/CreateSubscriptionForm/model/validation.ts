import { z } from "zod";

export const createSubscriptionSchema = z.object({
  name: z.string().nonempty("Name is required"),
  link: z.string().url("Must be a valid URL"),
  startDate: z.string().nonempty("Start date is required"),
  billingPeriod: z.string().nonempty("Billing period is required"),
  price: z
    .number({ invalid_type_error: "Price must be a number" })
    .positive("Price must be greater than 0"),
  category: z.string().nonempty("Category is required"),
});

export type CreateSubscriptionFormData = z.infer<
  typeof createSubscriptionSchema
>;
