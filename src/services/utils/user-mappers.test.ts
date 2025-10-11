import { describe, it, expect } from 'vitest';
import { UserWithRole } from '@/types/user.types';

type TestUser = Pick<UserWithRole, 'id' | 'name' | 'role'> & Partial<Omit<UserWithRole, 'id' | 'name' | 'role'>>;
const mockUsers: TestUser[] = [
  {
    id: 1,
    name: 'Alice Johnson',
    role: 'admin',
  },
  {
    id: 2,
    name: 'Bob Smith',
    role: 'user',
  },
  {
    id: 3,
    name: 'Carol Doe',
    role: 'moderator',
  },
  {
    id: 4,
    name: 'Alina Ray',
    role: 'user',
  },
];

function filterUsers(
  users: TestUser[],
  searchQuery: string,
  roleFilter: string
): TestUser[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const allRoles = roleFilter === 'all';
  
  if (!users || users.length === 0) return [];

  return users.filter((user) => {
    const matchesRole = allRoles || user.role === roleFilter;
    const matchesSearch =
      normalizedQuery === '' || 
      user.name.toLowerCase().includes(normalizedQuery);
    return matchesRole && matchesSearch;
  });
}

describe('User Filtering Logic', () => {
  describe('filterUsers', () => {
    it('returns all users when no filters applied', () => {
      const result = filterUsers(mockUsers, '', 'all');
      
      expect(result).toHaveLength(4);
      expect(result).toEqual(mockUsers);
    });

    it('filters by search query (name)', () => {
      const result = filterUsers(mockUsers, 'alice', 'all');
      
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Alice Johnson');
    });


    it('filters by role (admin)', () => {
      const result = filterUsers(mockUsers, '', 'admin');
      
      expect(result).toHaveLength(1);
      expect(result[0].role).toBe('admin');
      expect(result[0].name).toBe('Alice Johnson');
    });

    it('filters by role (user)', () => {
      const result = filterUsers(mockUsers, '', 'user');
      
      expect(result).toHaveLength(2);
      expect(result.every(user => user.role === 'user')).toBe(true);
      expect(result.map(u => u.name)).toEqual(['Bob Smith', 'Alina Ray']);
    });

    it('filters by role (moderator)', () => {
      const result = filterUsers(mockUsers, '', 'moderator');
      
      expect(result).toHaveLength(1);
      expect(result[0].role).toBe('moderator');
      expect(result[0].name).toBe('Carol Doe');
    });

    it('filters by combined search and role', () => {
      const result = filterUsers(mockUsers, 'ali', 'user');
      
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Alina Ray');
      expect(result[0].role).toBe('user');
    });

    it('returns empty array when no matches found', () => {
      const result = filterUsers(mockUsers, 'nonexistent', 'all');
      
      expect(result).toHaveLength(0);
    });

    it('returns empty array when role filter has no matches', () => {
      const result = filterUsers(mockUsers, '', 'nonexistent-role');
      
      expect(result).toHaveLength(0);
    });

    it('handles case insensitive search', () => {
      const result = filterUsers(mockUsers, 'ALICE', 'all');
      
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Alice Johnson');
    });

    it('handles partial search matches', () => {
      const result = filterUsers(mockUsers, 'ali', 'all');
      
      expect(result).toHaveLength(2);
      expect(result.map(u => u.name)).toEqual(['Alice Johnson', 'Alina Ray']);
    });

    it('handles empty search query with role filter', () => {
      const result = filterUsers(mockUsers, '', 'user');
      
      expect(result).toHaveLength(2);
      expect(result.every(user => user.role === 'user')).toBe(true);
    });

    it('handles empty role filter with search query', () => {
      const result = filterUsers(mockUsers, 'alice', 'all');
      
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Alice Johnson');
    });

    it('handles both empty filters', () => {
      const result = filterUsers(mockUsers, '', 'all');
      
      expect(result).toHaveLength(4);
      expect(result).toEqual(mockUsers);
    });
  });
});
