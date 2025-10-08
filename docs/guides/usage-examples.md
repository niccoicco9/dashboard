## Usage Examples

### Show users with filters and infinite scroll

```tsx
import Toolbar from '@/components/toolbar/toolbar';
import UserCard from '@/components/user/user-card/user-card';
import LoadMore from '@/components/user/load-more/load-more';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useMemo, useState } from 'react';

export default function UsersExample() {
  const { users, loading, error, hasMore, loadMore, isLoadingMore } = useInfiniteScroll();
  const [role, setRole] = useState('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => users.filter(u => (role === 'all' || u.role === role) && u.name.toLowerCase().includes(query.toLowerCase())), [users, role, query]);

  if (loading) return <div>Loading…</div>;
  if (error) return <div role="alert">{error}</div>;

  return (
    <div>
      <Toolbar onRoleFilter={setRole} onSearch={setQuery} userCount={filtered.length} />
      <div>
        {filtered.map(u => <UserCard key={u.id} user={u} onClick={() => {}} />)}
      </div>
      <LoadMore onLoadMore={loadMore} loading={loading} hasMore={hasMore} isLoadingMore={isLoadingMore} />
    </div>
  );
}
```

### Listen to global errors

```tsx
import { useEffect } from 'react';
import { errorBus } from '@/lib/error-bus';

export function ErrorLogger() {
  useEffect(() => {
    const unsub = errorBus.subscribe((evt) => {
      if (evt) console.log(`[${evt.type}]`, evt.message);
    });
    return unsub;
  }, []);
  return null;
}
```

