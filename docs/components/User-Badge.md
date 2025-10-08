## Badge

Displays role or status with icon.

Props (union):
- `{ kind: 'role'; variant: 'admin' | 'moderator' | 'user'; children: React.ReactNode }`
- `{ kind: 'status'; variant: 'active' | 'inactive' | 'pending'; children: React.ReactNode }`

Usage:
```tsx
import Badge from '@/components/user/badge/badge';

<Badge kind="role" variant="admin">admin</Badge>
<Badge kind="status" variant="active">active</Badge>
```

