import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TokenState {
  token: string | null;
  isAuthenticated: boolean;
  setToken: (token: string) => void;
  clearToken: () => void;
}

const initialState = {
  token: null,
  isAuthenticated: false,
};

export const useTokenSlice = create<TokenState>()(
  persist(
    (set) => ({
      ...initialState,
      setToken: (token) => set({ token, isAuthenticated: true }),
      clearToken: () => set({ token: null, isAuthenticated: false }),
    }),
    { name: "token-slice" },
  ),
);
