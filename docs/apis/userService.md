## userService

Public API for fetching users.

### getUsers(page?: number, limit?: number)

Returns a promise resolving to `{ users: UserWithRole[], hasMore: boolean, total: number }`.

Behavior:
- Simulates latency (1s).
- Can emit errors to `errorBus` (network/timeout/server/unknown) if debug flags are enabled in source.
- Fetches from Random User API and maps to `UserWithRole` with `role`, `status`, `avatar`.

Example:
```ts
import { userService } from '@/services/user.service';

const { users, hasMore, total } = await userService.getUsers(1, 12);
```

### getUserById(id: number)

Returns a promise resolving to a single `UserWithRole`.

Example:
```ts
import { userService } from '@/services/user.service';

const user = await userService.getUserById(3);
```

