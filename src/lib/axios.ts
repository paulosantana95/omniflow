import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${import.meta.env.VITE_SUPER_ADMIN_TOKEN}`
  }
});

export const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/v2/api/external/68ec8a4d-f3f1-4a3a-b7e9-13e76c447857`,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${import.meta.env.VITE_ADMIN_TOKEN}`
  }
})