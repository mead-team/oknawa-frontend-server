import axios from 'axios';

export const baseURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const baseKEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const api = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'apikey': baseKEY,
    'Authorization': `Bearer ${baseKEY}`,
  },
});

export const pollingApi = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    'Accept': 'application/vnd.pgrst.object+json',
    'apikey': baseKEY,
    'Authorization': `Bearer ${baseKEY}`,
  },
});

export const edgeApi = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${baseKEY}`,
  },
});