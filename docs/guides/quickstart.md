## Quickstart

### Install and run

```bash
npm install
npm run dev
```

Open the app at `http://localhost:5173`.

### Core concepts

- Use `userService.getUsers(page, limit)` to fetch paginated users (mocked from Random User API) with `role`, `status`, and `avatar` fields added.
- Use the `useInfiniteScroll` hook in pages to manage user loading with infinite scrolling.
- Display users with `UserList`, which composes toolbar filters, list grid, side panel, and infinite load.
- Use `errorBus` to emit and subscribe to global error events. `GlobalErrorHandler` displays them.

### Minimal example (using the hook)

```tsx
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

export function UsersPage() {
  const { users, loading, error, loadMore, hasMore } = useInfiniteScroll();

  if (loading) return <div>Loading…</div>;
  if (error) return <div role="alert">{error}</div>;

  return (
    <div>
      <ul>
        {users.map(u => (<li key={u.id}>{u.name}</li>))}
      </ul>
      {hasMore && <button onClick={loadMore}>Load more</button>}
    </div>
  );
}
```

