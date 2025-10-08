export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  username: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface UserWithRole extends User {
  role: UserRole;
  status: UserStatus;
  avatar: string;
}

export type UserRole = 'admin' | 'user' | 'moderator';
export type UserStatus = 'active' | 'inactive' | 'pending';

export const USER_ROLES: readonly UserRole[] = ['admin', 'user', 'moderator'] as const;
export const USER_STATUSES: readonly UserStatus[] = ['active', 'inactive', 'pending'] as const;
