import { useMemo } from 'react';
import type { UserWithRole } from '@/types/user.types';

export function useUserFilters(users: UserWithRole[], roleFilter: string, searchQuery: string) {
  const filteredUsers = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const allRoles = roleFilter === 'all';
    if (!users || users.length === 0) return [];

    return users.filter((user) => {
      const matchesRole = allRoles || user.role === roleFilter;
      const matchesSearch =
        normalizedQuery === '' || user.name.toLowerCase().includes(normalizedQuery);
      return matchesRole && matchesSearch;
    });
  }, [users, roleFilter, searchQuery]);

  return { filteredUsers };
}


