import { UserWithRole } from '../../../types/user.types';
import styles from './user-card.module.scss';
import Badge from '../badge/badge';

interface UserCardProps {
  user: UserWithRole;
}

function UserCard({ user }: UserCardProps) {

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <img
          src={user.avatar}
          alt={`${user.name} avatar`}
          className={styles.avatar}
        />
        <div className={styles.details}>
          <h3 className={styles.name}>{user.name}</h3>
          <p className={styles.email}>{user.email}</p>
        </div>
      </div>

      <div className={styles.stack}>
        <div className={styles.row}>
          <span className={styles.label}>Role</span>
          <Badge kind="role" variant={user.role}>{user.role}</Badge>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Status</span>
          <Badge kind="status" variant={user.status}>{user.status}</Badge>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
