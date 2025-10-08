## UserList

Composes toolbar, grid of users, infinite loading, and side panel.

Props: none

Behavior:
- Fetches users via `useInfiniteScroll`.
- Filters by role and search query.
- Disables infinite scroll when filters active or few results.

Usage:
```tsx
import UserList from '@/components/user/user-list/user-list';

<UserList />
```

