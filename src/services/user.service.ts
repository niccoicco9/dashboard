import axios from 'axios';
import { User, UserWithRole } from '../types/user.types';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';
const RANDOM_USER_API = 'https://randomuser.me/api';

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
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Failed to fetch users');
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
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new Error('Failed to fetch user');
    }
  },
};
