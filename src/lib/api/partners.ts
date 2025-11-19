import { apiFetch as serverFetch } from './apiClient.server';
import { apiFetch as clientFetch } from './apiClient';
import type { Partner } from '@/lib/definitions';


interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
}

/**
 * Fetch all partners (Server)
 */
export async function getPartners(): Promise<Partner[]> {
  try {
    const response = await serverFetch<PaginatedResponse<Partner>>('/partners');
    return response.data; // ✅ Extract array
  } catch (error) {
    console.error('❌ Failed to fetch partners:', error);
    return [];
  }
}

/**
 * Fetch all partners (Client)
 */
export async function getPartnersClient(): Promise<Partner[]> {
  try {
    const response = await clientFetch<PaginatedResponse<Partner>>('/partners');
    return response.data; // ✅ Extract array
  } catch (error) {
    console.error('❌ Failed to fetch partners on client:', error);
    return [];
  }
}







// export async function getPartners(): Promise<Partner[]> {
//   try {
//     return await serverFetch<Partner[]>('/partners');
//   } catch (error) {
//     console.error('Failed to fetch partners:', error);
//     return [];
//   }
// }

// export async function getPartnersClient(): Promise<Partner[]> {
//     try {
//       return await clientFetch<Partner[]>('/partners');
//     } catch (error) {
//       console.error('Failed to fetch partners on client:', error);
//       return [];
//     }
//   }
