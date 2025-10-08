import { UserWithRole } from '@/types/user.types';

export type RandomUserApiUser = {
  name: { first: string; last: string };
  email: string;
  picture: { large: string };
};

const roles: Array<UserWithRole['role']> = ['admin', 'user', 'moderator'];
const statuses: Array<UserWithRole['status']> = ['active', 'inactive', 'pending'];

export function mapRandomUser(
  user: RandomUserApiUser,
  index: number,
  page: number,
  limit: number
): UserWithRole {
  const userId = (page - 1) * limit + index + 1;
  return {
    id: userId,
    name: `${user.name.first} ${user.name.last}`,
    email: user.email,
    role: roles[index % roles.length],
    status: statuses[index % statuses.length],
    avatar: user.picture.large,
  } as UserWithRole;
}


