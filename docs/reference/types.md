## Types

### User
```ts
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  username: string;
  address: { street: string; suite: string; city: string; zipcode: string; geo: { lat: string; lng: string } };
  company: { name: string; catchPhrase: string; bs: string };
}
```

### UserWithRole
```ts
interface UserWithRole extends User {
  role: 'admin' | 'user' | 'moderator';
  status: 'active' | 'inactive' | 'pending';
  avatar: string;
}
```

