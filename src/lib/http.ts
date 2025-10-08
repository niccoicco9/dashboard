import axios from 'axios';
import { DEFAULT_API_TIMEOUT_MS } from '@/consts/api.const';

export const http = axios.create({
  timeout: DEFAULT_API_TIMEOUT_MS,
});

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return error.message || 'Request failed';
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'Unknown error';
}

