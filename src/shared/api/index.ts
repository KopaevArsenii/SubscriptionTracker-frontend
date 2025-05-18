import axios from "axios";
import { useTokenSlice } from "@/shared/api/useTokenSlice.ts";

const ip = "192.168.1.154";

export const api = axios.create({
  baseURL: `http://${ip}:3000`,
});

api.interceptors.request.use((config) => {
  const token = useTokenSlice.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
