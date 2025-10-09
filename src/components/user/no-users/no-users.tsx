import { Users } from 'lucide-react';
import { NO_USERS_TITLE, NO_USERS_TEXT } from '@/consts/text.const';
import styles from './no-users.module.scss';

function NoUsers() {
  return (
    <div className={styles.noUsers} data-testid="no-users">
      <div className={styles.icon} data-testid="users-icon">
        <Users size={48} />
      </div>
      <h3 className={styles.title}>{NO_USERS_TITLE}</h3>
      <p className={styles.text}>
        {NO_USERS_TEXT}
      </p>
    </div>
  );
}

export default NoUsers;
