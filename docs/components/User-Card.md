## UserCard

Displays a single user's basic info and role badge.

Props:
- `user: UserWithRole`
- `onClick: () => void`

Usage:
```tsx
import UserCard from '@/components/user/user-card/user-card';

<UserCard user={user} onClick={() => setSelected(user)} />
```

