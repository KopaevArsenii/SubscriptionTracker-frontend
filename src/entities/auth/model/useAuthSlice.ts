import { create } from "zustand";
import {
  LogInRequest,
  LogInResponse,
  SignUpRequest,
} from "@/entities/auth/model/types.ts";
import { api } from "@/shared/api";
import { useTokenSlice } from "@/shared/api/useTokenSlice.ts";

interface AuthState {
  logIn: (data: LogInRequest) => Promise<void>;
  signUp: (data: SignUpRequest) => Promise<void>;
  logOut: () => void;
}

export const useAuthSlice = create<AuthState>()(() => ({
  logIn: (data) =>
    api
      .post<LogInResponse>("/auth/login", data)
      .then((data) => {
        useTokenSlice.getState().setToken(data.data.token);
      })
      .catch((error) => {
        throw new Error(error?.response?.data?.message || "Error while login!");
      }),
  signUp: (data) =>
    api
      .post<void>("/auth/registration", data)
      .then(() => {})
      .catch((error) => {
        throw new Error(error?.response?.data?.message || "Error while login!");
      }),
  logOut: () => {
    useTokenSlice.getState().clearToken();
  },
}));
