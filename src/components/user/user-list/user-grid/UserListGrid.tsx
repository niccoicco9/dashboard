import type { UserWithRole } from '@/types/user.types';
import UserCard from '@/components/user/user-card/user-card';
import NoUsers from '@/components/user/no-users/no-users';
import Grid from '@/components/grid/grid';

interface UserListGridProps {
  users: UserWithRole[];
  onUserClick: (user: UserWithRole) => void;
  className?: string;
}

export default function UserListGrid({ users, onUserClick, className }: UserListGridProps) {
  return (
    <Grid columns={{ sm: 2, lg: 3, xl: 4 }} className={className}>
      {users.length > 0 ? (
        users.map((user, index) => (
          <UserCard key={`${user.id}-${index}`} user={user} onClick={() => onUserClick(user)} />
        ))
      ) : (
        <NoUsers />
      )}
    </Grid>
  );
}


