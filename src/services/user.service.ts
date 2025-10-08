import { http, getErrorMessage } from '@/lib/http';
import { errorBus, getErrorTypeFromMessage } from '@/lib/error-bus';
import { API_JSONPLACEHOLDER, API_RANDOM_USER } from '@/consts/api.const';
import { User, UserWithRole, USER_ROLES, USER_STATUSES } from '@/types/user.types';

const DEBUG_API_ERRORS = {
  ENABLE_ERRORS: false,
  ERROR_TYPE: 'network',
  ERROR_PAGE: 2,
};

const shouldSimulateError = (page: number): boolean => {
  if (!DEBUG_API_ERRORS.ENABLE_ERRORS) return false;
  if (DEBUG_API_ERRORS.ERROR_PAGE === 0) return false;
  return page === DEBUG_API_ERRORS.ERROR_PAGE;
};

export const userService = {
  async getUsers(page: number = 1, limit: number = 12): Promise<{ users: UserWithRole[], hasMore: boolean, total: number }> {
    try {
      if (shouldSimulateError(page)) {
        switch (DEBUG_API_ERRORS.ERROR_TYPE) {
          case 'network':
            throw new Error('Network Error: Failed to fetch users');
          case 'timeout':
            throw new Error('Timeout Error: Request timed out');
          case 'server':
            throw new Error('Server Error: Internal server error');
          default:
            throw new Error('Unknown Error: Unexpected error occurred');
        }
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000));

      type RandomUser = {
        name: { first: string; last: string };
        email: string;
        picture: { large: string };
      };

      const params = new URLSearchParams({ results: String(limit), page: String(page), seed: 'users' });
      const response = await http.get<{ results: RandomUser[] }>(`${API_RANDOM_USER}?${params.toString()}`);
      const randomUsers = response.data.results;

      const usersWithRoles = randomUsers.map((user: RandomUser, index: number) => ({
        id: (page - 1) * limit + index + 1,
        name: `${user.name.first} ${user.name.last}`,
        email: user.email,
        role: USER_ROLES[index % USER_ROLES.length],
        status: USER_STATUSES[index % USER_STATUSES.length],
        avatar: user.picture.large,
      }));
      
      const hasMore = page < 10;
      
      return {
        users: usersWithRoles,
        hasMore,
        total: hasMore ? -1 : 100
      };
    } catch (error: unknown) {
      const message: string = getErrorMessage(error) || 'Failed to fetch users';
      const type = getErrorTypeFromMessage(message);
      errorBus.emitMessage(message, type);
      throw new Error(message);
    }
  },

  async getUserById(id: number): Promise<UserWithRole> {
    try {
      const response = await http.get<User>(`${API_JSONPLACEHOLDER}/users/${id}`);
      const user = response.data;
      
      return {
        ...user,
        role: USER_ROLES[id % USER_ROLES.length],
        status: USER_STATUSES[id % USER_STATUSES.length],
        avatar: `https://i.pravatar.cc/150?img=${user.id}`,
      };
    } catch (error: unknown) {
      const message: string = getErrorMessage(error) || 'Failed to fetch user';
      const type = getErrorTypeFromMessage(message);
      errorBus.emitMessage(message, type);
      throw new Error(message);
    }
  },
};
