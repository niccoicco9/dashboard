## useInfiniteScroll

Hook to load users with infinite scrolling.

Signature:
```ts
function useInfiniteScroll(): {
  users: UserWithRole[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
  total: number;
  isLoadingMore: boolean;
}
```

Usage:
```tsx
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

function Users() {
  const { users, loading, error, hasMore, loadMore, isLoadingMore } = useInfiniteScroll();
  // render UI
}
```

Notes:
- `loadMore` increments page and appends new users when `hasMore` is true.
- Errors are exposed via `error` and also emitted on `errorBus` by the service.

