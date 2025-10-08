## Header

Top navigation with theme toggle and brand link.

Props: none

Behavior:
- Shows logo and `HEADER_TITLE`.
- Clicking brand navigates to home or reloads if already on home.
- Theme toggle switches between light/dark and persists to `localStorage`.

Usage:
```tsx
import Header from '@/components/header/header';

<Header />
```

