import { UserWithRole } from '@/types/user.types';
import Typography from '@/components/input/typography/typography';
import styles from '@/components/user/user-card/user-card.module.scss';
import Badge from '@/components/user/user-badge/user-badge';

interface UserCardProps {
  user: UserWithRole;
  onClick?: () => void;
}

function UserCard({ user, onClick }: UserCardProps) {

  return (
    <div className={styles.card} onClick={onClick} data-testid="user-card">
      <div className={styles.header}>
        <div className={styles.details}>
        <Typography variant="subtitle" className={styles.name} data-testid="user-name">{user.name}</Typography>
        <Typography variant="body" className={styles.email} data-testid="user-email" title={user.email}>{user.email}</Typography>
        </div>
      </div>

      <div className={styles.stack}>
        <div className={styles.row}>
          <span className={styles.label}>Role</span>
          <Badge kind="role" variant={user.role}>
            <span data-testid="user-role">{user.role}</span>
          </Badge>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
