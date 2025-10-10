import { useState, useEffect, useCallback, useRef } from 'react';
import { UserWithRole } from '@/types/user.types';
import { userService } from '@/services/user.service';

interface UseInfiniteScrollReturn {
  users: UserWithRole[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
  total: number | undefined;
  isLoadingMore: boolean;
}

export function useInfiniteScroll(): UseInfiniteScrollReturn {
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState<number | undefined>(undefined);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  const MAX_PAGES = 10;
  
  const isFetchingRef = useRef(false);
  const usersRef = useRef<UserWithRole[]>([]);

  const loadUsers = useCallback(async (pageNum: number, append: boolean = false) => {
    if (isFetchingRef.current) return;
    try {
      isFetchingRef.current = true;
      if (!append) {
        setLoading(true);
      } else {
        setIsLoadingMore(true);
      }
      setError(null);
      
      const result = await userService.getUsers(pageNum, 12);
      
      const newUsers = append ? [...usersRef.current, ...result.users] : result.users;
      setUsers(newUsers);

      const reachedPageLimit = pageNum >= MAX_PAGES;
      setHasMore(result.hasMore && !reachedPageLimit);
      setTotal(result.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
      isFetchingRef.current = false;
    }
  }, []);

  const loadMore = useCallback(() => {
    if (isFetchingRef.current) return;
    if (!loading && !isLoadingMore && hasMore) {
      const nextPage = page + 1;
      if (nextPage > MAX_PAGES) {
        setHasMore(false);
        return;
      }
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

  useEffect(() => {
    usersRef.current = users;
  }, [users]);

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


