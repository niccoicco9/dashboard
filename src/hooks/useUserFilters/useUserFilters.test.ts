import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useUserFilters } from './useUserFilters';
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

describe('useUserFilters', () => {
  it('returns all users when no filters applied', () => {
    const { result } = renderHook(() => useUserFilters(mockUsers as UserWithRole[], 'all', ''));
    
    expect(result.current.filteredUsers).toHaveLength(4);
    expect(result.current.filteredUsers).toEqual(mockUsers);
  });

  it('filters by search query', () => {
    const { result } = renderHook(() => useUserFilters(mockUsers as UserWithRole[], 'all', 'alice'));
    
    expect(result.current.filteredUsers).toHaveLength(1);
    expect(result.current.filteredUsers[0].name).toBe('Alice Johnson');
  });

  it('filters by role', () => {
    const { result } = renderHook(() => useUserFilters(mockUsers as UserWithRole[], 'user', ''));
    
    expect(result.current.filteredUsers).toHaveLength(2);
    expect(result.current.filteredUsers.every(user => user.role === 'user')).toBe(true);
  });

  it('filters by combined search and role', () => {
    const { result } = renderHook(() => useUserFilters(mockUsers as UserWithRole[], 'user', 'ali'));
    
    expect(result.current.filteredUsers).toHaveLength(1);
    expect(result.current.filteredUsers[0].name).toBe('Alina Ray');
    expect(result.current.filteredUsers[0].role).toBe('user');
  });

  it('handles case insensitive search', () => {
    const { result } = renderHook(() => useUserFilters(mockUsers as UserWithRole[], 'all', 'ALICE'));
    
    expect(result.current.filteredUsers).toHaveLength(1);
    expect(result.current.filteredUsers[0].name).toBe('Alice Johnson');
  });

  it('handles partial search matches', () => {
    const { result } = renderHook(() => useUserFilters(mockUsers as UserWithRole[], 'all', 'ali'));
    
    expect(result.current.filteredUsers).toHaveLength(2);
    expect(result.current.filteredUsers.map(u => u.name)).toEqual(['Alice Johnson', 'Alina Ray']);
  });

  it('returns empty array when no matches found', () => {
    const { result } = renderHook(() => useUserFilters(mockUsers as UserWithRole[], 'all', 'nonexistent'));
    
    expect(result.current.filteredUsers).toHaveLength(0);
  });

  it('returns empty array when role filter has no matches', () => {
    const { result } = renderHook(() => useUserFilters(mockUsers as UserWithRole[], 'nonexistent-role', ''));
    
    expect(result.current.filteredUsers).toHaveLength(0);
  });

  it('handles empty users array', () => {
    const { result } = renderHook(() => useUserFilters([], 'all', ''));
    
    expect(result.current.filteredUsers).toHaveLength(0);
  });

  it('handles null/undefined users', () => {
    const { result } = renderHook(() => useUserFilters(null as any, 'all', ''));
    
    expect(result.current.filteredUsers).toHaveLength(0);
  });

  it('handles whitespace in search query', () => {
    const { result } = renderHook(() => useUserFilters(mockUsers as UserWithRole[], 'all', '  alice  '));
    
    expect(result.current.filteredUsers).toHaveLength(1);
    expect(result.current.filteredUsers[0].name).toBe('Alice Johnson');
  });
});
