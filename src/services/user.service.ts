import { apiClient } from './http/api-client';
import { User, UserWithRole } from '@/types/user.types';
import { errorBus } from '@/lib/error-bus';
import { API_BASE_URL, RANDOM_USER_API } from '@/consts/api.const';
import { mapRandomUser, RandomUserApiUser } from './utils/user-mappers';
import { deriveErrorType } from './utils/error-utils';

const roles: Array<'admin' | 'user' | 'moderator'> = ['admin', 'user', 'moderator'];
const statuses: Array<'active' | 'inactive' | 'pending'> = ['active', 'inactive', 'pending'];

const DEFAULT_LIMIT = 12;
const TOTAL_PAGES = 10;

export const userService = {
  async getUsers(page: number = 1, limit: number = DEFAULT_LIMIT, signal?: AbortSignal): Promise<{ users: UserWithRole[], hasMore: boolean, total: number | undefined }> {
    try {
      const response = await apiClient.get<{ results: RandomUserApiUser[] }>(
        `${RANDOM_USER_API}?results=${limit}&page=${page}&seed=users`,
        { signal }
      );
      const randomUsers = response.data.results;
      
      const usersWithRoles = randomUsers.map((user, index) =>
        mapRandomUser(user, index, page, limit)
      );
      
      const hasMore = page < TOTAL_PAGES;
      
      return {
        users: usersWithRoles,
        hasMore,
        total: hasMore ? undefined : TOTAL_PAGES * limit
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
      const response = await apiClient.get<User>(`${API_BASE_URL}/users/${id}`);
      const user = response.data;
      
      return {
        ...user,
        role: roles[id % roles.length],
        status: statuses[id % statuses.length],
        avatar: `https://i.pravatar.cc/150?img=${user.id}`,
      };
    } catch (error: any) {
      const message: string = error?.message || 'Failed to fetch user';
      errorBus.emitMessage(message, 'unknown');
      throw new Error(message);
    }
  },
};
