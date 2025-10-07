import styles from './user-card-skeleton.module.scss';

function UserCardSkeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.details}>
          <div className={styles.nameSkeleton}></div>
          <div className={styles.emailSkeleton}></div>
        </div>
      </div>

      <div className={styles.stack}>
        <div className={styles.row}>
          <div className={styles.labelSkeleton}></div>
          <div className={styles.badgeSkeleton}></div>
        </div>
      </div>
    </div>
  );
}

export default UserCardSkeleton;
