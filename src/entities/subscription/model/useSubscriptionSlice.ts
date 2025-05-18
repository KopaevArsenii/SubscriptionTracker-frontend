import {
  Subscription,
  CreateSubscriptionRequest,
} from "@/entities/subscription/model/types.ts";
import { create } from "zustand";
import { api } from "@/shared/api";

interface SubscriptionState {
  subscriptions: Subscription[];
  periods: string[];
  switchSubscription: (id: string) => Promise<void>;
  getSubscriptions: () => Promise<void>;
  getPeriods: () => Promise<void>;
  createSubscription: (data: CreateSubscriptionRequest) => Promise<void>;
  updateSubscription: (
    data: CreateSubscriptionRequest,
    id: string,
  ) => Promise<void>;
  deleteSubscription: (id: string) => Promise<void>;
}

const initialState = {
  subscriptions: [],
  periods: [],
};

export const useSubscriptionSlice = create<SubscriptionState>()((set) => ({
  ...initialState,

  switchSubscription: (id) =>
    api
      .get(`/subscriptions/switch/${id}`)
      .then(() => {})
      .catch((error) => {
        throw new Error(
          error?.response?.data?.message ||
            "Error while switching subscription status!",
        );
      }),
  getSubscriptions: () =>
    api
      .get<Subscription[]>("/subscriptions")
      .then((res) => set({ subscriptions: res.data }))
      .catch((error) => {
        throw new Error(
          error?.response?.data?.message ||
            "Error while getting subscriptions!",
        );
      }),

  getPeriods: () =>
    api
      .get<string[]>("/subscriptions/periods")
      .then(({ data }) => set({ periods: data }))
      .catch((error) => {
        throw new Error(
          error?.response?.data?.message || "Error while getting periods!",
        );
      }),

  createSubscription: (data) =>
    api
      .post("/subscriptions", data)
      .then(() => {})
      .catch((error) => {
        throw new Error(
          error?.response?.data?.message ||
            "Error while creating subscription!",
        );
      }),

  updateSubscription: (data, id) =>
    api
      .put(`/subscriptions/${id}`, data)
      .then(() => {})
      .catch((error) => {
        throw new Error(
          error?.response?.data?.message ||
            "Error while updating subscription!",
        );
      }),

  deleteSubscription: (id) =>
    api
      .delete(`/subscriptions/${id}`)
      .then(() => {})
      .catch((error) => {
        throw new Error(
          error?.response?.data?.message ||
            "Error while deleting subscription!",
        );
      }),
}));
