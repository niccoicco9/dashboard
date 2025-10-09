import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import { useInfiniteScroll } from './useInfiniteScroll';

vi.mock('@/services/user.service', () => ({
  userService: {
    getUsers: vi.fn()
  }
}));

describe('useInfiniteScroll', () => {
  it('should initialize with empty users and loading true', () => {
    const { result } = renderHook(() => useInfiniteScroll());
    
    expect(result.current.users).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
    expect(result.current.hasMore).toBe(true);
    expect(result.current.total).toBeUndefined();
  });

  it('should have loadMore function', () => {
    const { result } = renderHook(() => useInfiniteScroll());
    expect(typeof result.current.loadMore).toBe('function');
  });

  it('should handle loadMore call', () => {
    const { result } = renderHook(() => useInfiniteScroll());
    act(() => {
      result.current.loadMore();
    });
    expect(typeof result.current.loadMore).toBe('function');
  });
});


