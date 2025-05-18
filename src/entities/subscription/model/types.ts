import { Category } from "@/entities/category/model/types.ts";

export type Subscription = {
  _id: string;
  name: string;
  link: string;
  startDate: string;
  billingPeriod: string;
  price: number;
  isActive: boolean;
  category: Category;
  userId: string;
};

export interface CreateSubscriptionRequest {
  name: string;
  link: string;
  startDate: string;
  billingPeriod: string;
  price: number;
  category: string;
}
