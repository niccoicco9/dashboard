import axios from 'axios';
import { User, UserWithRole } from '@/types/user.types';
import { errorBus } from '@/lib/error-bus';
import { API_BASE_URL, RANDOM_USER_API } from '@/consts/api.const';

const roles: Array<'admin' | 'user' | 'moderator'> = ['admin', 'user', 'moderator'];
const statuses: Array<'active' | 'inactive' | 'pending'> = ['active', 'inactive', 'pending'];

 

export const userService = {
  async getUsers(page: number = 1, limit: number = 12): Promise<{ users: UserWithRole[], hasMore: boolean, total: number }> {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const response = await axios.get(`${RANDOM_USER_API}?results=${limit}&page=${page}&seed=users`);
      const randomUsers = response.data.results;
      
      const usersWithRoles = randomUsers.map((user: any, index: number) => ({
        id: (page - 1) * limit + index + 1,
        name: `${user.name.first} ${user.name.last}`,
        email: user.email,
        role: roles[index % roles.length] as 'admin' | 'user' | 'moderator',
        status: statuses[index % statuses.length] as 'active' | 'inactive' | 'pending',
        avatar: user.picture.large,
      }));
      
      const hasMore = page < 10;
      
      return {
        users: usersWithRoles,
        hasMore,
        total: hasMore ? -1 : 100
      };
    } catch (error: any) {
      const message: string = error?.message || 'Failed to fetch users';
      const lowered = message.toLowerCase();
      const type = lowered.includes('network')
        ? 'network'
        : lowered.includes('timeout')
        ? 'timeout'
        : lowered.includes('server')
        ? 'server'
        : 'unknown';
      errorBus.emitMessage(message, type);
      throw new Error(message);
    }
  },

  async getUserById(id: number): Promise<UserWithRole> {
    try {
      const response = await axios.get<User>(`${API_BASE_URL}/users/${id}`);
      const user = response.data;
      
      return {
        ...user,
        role: roles[id % roles.length] as 'admin' | 'user' | 'moderator',
        status: statuses[id % statuses.length] as 'active' | 'inactive' | 'pending',
        avatar: `https://i.pravatar.cc/150?img=${user.id}`,
      };
    } catch (error: any) {
      const message: string = error?.message || 'Failed to fetch user';
      errorBus.emitMessage(message, 'unknown');
      throw new Error(message);
    }
  },
};
