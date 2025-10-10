import { ALL_ROLES_OPTION, ADMIN_ROLE_OPTION, MODERATOR_ROLE_OPTION, USER_ROLE_OPTION } from '@/consts/text.const';

export type RoleValue = 'all' | 'admin' | 'moderator' | 'user';

export interface SelectOption<T extends string = string> {
  value: T;
  label: string;
}

export const ROLE_OPTIONS: SelectOption<RoleValue>[] = [
  { value: 'all', label: ALL_ROLES_OPTION },
  { value: 'admin', label: ADMIN_ROLE_OPTION },
  { value: 'moderator', label: MODERATOR_ROLE_OPTION },
  { value: 'user', label: USER_ROLE_OPTION },
];


