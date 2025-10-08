import { UserWithRole } from '@/types/user.types';
import styles from './user-card.module.scss';
import Badge from '../badge/badge';

interface UserCardProps {
  user: UserWithRole;
  onClick: () => void;
}

function UserCard({ user, onClick }: UserCardProps) {

  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.header}>
        <div className={styles.details}>
          <h3 className={styles.name} title={user.name}>{user.name}</h3>
          <p className={styles.email} title={user.email}>{user.email}</p>
        </div>
      </div>

      <div className={styles.stack}>
        <div className={styles.row}>
          <span className={styles.label}>Role</span>
          <Badge kind="role" variant={user.role}>{user.role}</Badge>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
