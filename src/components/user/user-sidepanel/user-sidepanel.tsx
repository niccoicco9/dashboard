import { UserWithRole } from '@/types/user.types';
import styles from './user-sidepanel.module.scss';
import Badge from '../badge/badge';
import Avatar from '@/components/user/avatar/avatar';
import Typography from '@/components/input/typography/typography';
import SidePanel from '@/components/overlay/sidepanel/sidepanel';

interface UserSidePanelProps {
  user: UserWithRole | null;
  isOpen: boolean;
  onClose: () => void;
}

function UserSidePanel({ user, isOpen, onClose }: UserSidePanelProps) {
  if (!isOpen || !user) return null;

  return (
    <SidePanel isOpen={isOpen} onClose={onClose} title={null}>
      <div className={styles.userInfo}>
        <Avatar src={user.avatar} name={user.name} size={96} />
        <Typography variant="subtitle" className={styles.userName} data-testid="sidepanel-name">{user.name}</Typography>
        <Typography variant="body" className={styles.userEmail} data-testid="sidepanel-email">{user.email}</Typography>
        <div className={styles.badges}>
          <Badge kind="role" variant={user.role}>{user.role}</Badge>
          <Badge kind="status" variant={user.status}>{user.status}</Badge>
        </div>
      </div>
    </SidePanel>
  );
}

export default UserSidePanel;
