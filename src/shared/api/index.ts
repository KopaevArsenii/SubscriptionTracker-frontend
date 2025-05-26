import axios from "axios";
import { useTokenSlice } from "@/shared/api/useTokenSlice.ts";

const ip = "172.20.10.4";

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
