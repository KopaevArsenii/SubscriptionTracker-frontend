import { Subscription } from "@/entities/subscription/model/types.ts";

export function calculateYearExpense(subscriptions: Subscription[]) {
  let total = 0;
  subscriptions.forEach((subscription) => {
    if (!subscription.isActive) return;
    if (subscription.billingPeriod === "daily")
      total += subscription.price * 365;
    if (subscription.billingPeriod === "weekly")
      total += subscription.price * 52;
    if (subscription.billingPeriod === "monthly")
      total += subscription.price * 12;
    if (subscription.billingPeriod === "yearly") total += subscription.price;
  });
  return total;
}
