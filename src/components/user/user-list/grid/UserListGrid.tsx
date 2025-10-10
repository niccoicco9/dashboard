import type { UserWithRole } from '@/types/user.types';
import UserCard from '@/components/user/user-card/user-card';
import NoUsers from '@/components/user/no-users/no-users';
import styles from '@/components/user/user-list/grid/UserListGrid.module.scss';

interface UserListGridProps {
  users: UserWithRole[];
  onUserClick: (user: UserWithRole) => void;
  className?: string;
}

export default function UserListGrid({ users, onUserClick, className }: UserListGridProps) {
  return (
    <div className={className || styles.grid}>
      {users.length > 0 ? (
        users.map((user, index) => (
          <UserCard key={`${user.id}-${index}`} user={user} onClick={() => onUserClick(user)} />
        ))
      ) : (
        <NoUsers />
      )}
    </div>
  );
}


