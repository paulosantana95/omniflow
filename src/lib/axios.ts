import axios from "axios";

export const n8n = axios.create({
  baseURL: import.meta.env.VITE_N8N_WEBHOOK_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});