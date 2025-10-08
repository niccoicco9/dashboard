import { useState, useEffect, useCallback } from 'react';
import { UserWithRole } from '@/types/user.types';
import { userService } from '@/services/user.service';

interface UseInfiniteScrollReturn {
  users: UserWithRole[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
  total: number;
  isLoadingMore: boolean;
}

export function useInfiniteScroll(): UseInfiniteScrollReturn {
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  const loadUsers = useCallback(async (pageNum: number, append: boolean = false) => {
    try {
      if (!append) {
        setLoading(true);
      } else {
        setIsLoadingMore(true);
      }
      setError(null);
      
      const result = await userService.getUsers(pageNum, 12);
      
      if (append) {
        setUsers(prev => [...prev, ...result.users]);
      } else {
        setUsers(result.users);
      }
      
      setHasMore(result.hasMore);
      setTotal(result.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  }, []);

  const loadMore = useCallback(() => {
    if (!loading && !isLoadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadUsers(nextPage, true);
    } 
  }, [loading, hasMore, page, loadUsers, isLoadingMore]);

  useEffect(() => {
    if (!hasInitialized) {
      setHasInitialized(true);
      loadUsers(1, false);
    }
  }, [hasInitialized, loadUsers]);

  return {
    users,
    loading,
    error,
    hasMore,
    loadMore,
    total,
    isLoadingMore
  };
}
