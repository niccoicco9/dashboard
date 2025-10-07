import { UserWithRole } from '../../../types/user.types';
import styles from './user-card.module.scss';

interface UserCardProps {
  user: UserWithRole;
}

function UserCard({ user }: UserCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return styles.statusActive;
      case 'inactive':
        return styles.statusInactive;
      case 'pending':
        return styles.statusPending;
      default:
        return styles.statusPending;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return styles.roleAdmin;
      case 'moderator':
        return styles.roleModerator;
      case 'user':
        return styles.roleUser;
      default:
        return styles.roleUser;
    }
  };

  return (
    <div className={styles.card}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <img
          src={user.avatar}
          alt={`${user.name} avatar`}
          className={styles.avatar}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 className={styles.name}>{user.name}</h3>
          <p className={styles.email}>{user.email}</p>
        </div>
      </div>

      <div className={styles.stack}>
        <div className={styles.row}>
          <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Role</span>
          <span className={`${styles.badge} ${getRoleColor(user.role)}`}>
            {user.role}
          </span>
        </div>
        <div className={styles.row}>
          <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Status</span>
          <span className={`${styles.badge} ${getStatusColor(user.status)}`}>
            {user.status}
          </span>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
