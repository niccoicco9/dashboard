import { apiClient } from './http/api-client';
import { UserWithRole } from '@/types/user.types';
import { errorBus } from '@/lib/error-bus';
import { API_BASE_URL } from '@/consts/api.const';
import { mapRandomUser, RandomUserApiUser } from '@/services/utils/user-mappers';
import { deriveErrorType } from '@/services/utils/error-utils';

const roles: Array<'admin' | 'user' | 'moderator'> = ['admin', 'user', 'moderator'];
const statuses: Array<'active' | 'inactive' | 'pending'> = ['active', 'inactive', 'pending'];

const DEFAULT_LIMIT = 12;

export const userService = {
  async getUsers(page: number = 1, limit: number = DEFAULT_LIMIT, signal?: AbortSignal): Promise<{ users: UserWithRole[], hasMore: boolean, total: number | undefined }> {
    try {
      const response = await apiClient.get<{ results: RandomUserApiUser[] }>(
        `${API_BASE_URL}?results=${limit}&page=${page}&seed=users`,
        { signal }
      );
      const randomUsers = response.data.results;
      
      const usersWithRoles = randomUsers.map((user, index) =>
        mapRandomUser(user, index, page, limit)
      );
      
      const hasMore = randomUsers.length === limit;
      
      return {
        users: usersWithRoles,
        hasMore,
        total: undefined
      };
    } catch (error: any) {
      if (error?.name === 'CanceledError' || error?.code === 'ERR_CANCELED') {
        throw error;
      }
      const message: string = error?.message || 'Failed to fetch users';
      const type = deriveErrorType(message);
      errorBus.emitMessage(message, type);
      throw new Error(message);
    }
  },

  async getUserById(id: number): Promise<UserWithRole> {
    try {
      const response = await apiClient.get<{ results: RandomUserApiUser[] }>(
        `${API_BASE_URL}?results=1&seed=user${id}`
      );
      const randomUser = response.data.results[0];
      
      return mapRandomUser(randomUser, 0, 1, 1);
    } catch (error: any) {
      const message: string = error?.message || 'Failed to fetch user';
      errorBus.emitMessage(message, 'unknown');
      throw new Error(message);
    }
  },
};
