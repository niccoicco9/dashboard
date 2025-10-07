import axios from 'axios';
import { User, UserWithRole } from '../types/user.types';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

const roles: Array<'admin' | 'user' | 'moderator'> = ['admin', 'user', 'moderator'];
const statuses: Array<'active' | 'inactive' | 'pending'> = ['active', 'inactive', 'pending'];

export const userService = {
  async getUsers(): Promise<UserWithRole[]> {
    try {
      const response = await axios.get<User[]>(`${API_BASE_URL}/users`);
      
      return response.data.map((user, index) => ({
        ...user,
        role: roles[index % roles.length] as 'admin' | 'user' | 'moderator',
        status: statuses[index % statuses.length] as 'active' | 'inactive' | 'pending',
        avatar: `https://i.pravatar.cc/150?img=${user.id}`,
      }));
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
