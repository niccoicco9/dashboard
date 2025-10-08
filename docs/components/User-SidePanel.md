## UserSidePanel

Slide-over panel showing selected user details.

Props:
- `user: UserWithRole | null`
- `isOpen: boolean`
- `onClose: () => void`

Usage:
```tsx
import UserSidePanel from '@/components/user/user-sidepanel/user-sidepanel';

<UserSidePanel user={user} isOpen={isOpen} onClose={() => setOpen(false)} />
```

