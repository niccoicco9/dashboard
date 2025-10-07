import styles from './user-card-skeleton.module.scss';

function UserCardSkeleton() {
  return (
    <div className={styles.card} data-testid="user-card-skeleton">
      <div className={styles.header}>
        <div className={styles.details}>
          <div className={styles.nameSkeleton} data-testid="name-skeleton"></div>
          <div className={styles.emailSkeleton} data-testid="email-skeleton"></div>
        </div>
      </div>

      <div className={styles.stack}>
        <div className={styles.row}>
          <div className={styles.labelSkeleton} data-testid="label-skeleton"></div>
          <div className={styles.badgeSkeleton} data-testid="badge-skeleton"></div>
        </div>
      </div>
    </div>
  );
}

export default UserCardSkeleton;
