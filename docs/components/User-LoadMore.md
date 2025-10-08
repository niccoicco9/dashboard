## LoadMore

IntersectionObserver-based loader that triggers when visible and user has scrolled.

Props:
- `onLoadMore: () => void`
- `loading: boolean`
- `hasMore: boolean`
- `isLoadingMore?: boolean`

Usage:
```tsx
import LoadMore from '@/components/user/load-more/load-more';

<LoadMore onLoadMore={loadMore} loading={loading} hasMore={hasMore} />
```

