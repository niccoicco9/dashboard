## Toolbar

Sticky toolbar with title, search input, and role filter.

Props:
- `onRoleFilter(role: string): void` (required)
- `onSearch(query: string): void` (required)
- `userCount?: number`
- `totalCount?: number`

Usage:
```tsx
import Toolbar from '@/components/toolbar/toolbar';

<Toolbar onRoleFilter={setRole} onSearch={setQuery} userCount={42} totalCount={100} />
```

