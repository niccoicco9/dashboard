## SearchBar

Controlled search input with built-in clear and icon.

Props:
- `onSearch(query: string): void` (required)
- `value?: string` (default: `''`)

Usage:
```tsx
import SearchBar from '@/components/input/search-bar/search-bar';

<SearchBar onSearch={setQuery} />
```

