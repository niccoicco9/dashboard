import { UserWithRole } from '@/types/user.types';
import styles from './user-sidepanel.module.scss';
import Badge from '../badge/badge';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface UserSidePanelProps {
  user: UserWithRole | null;
  isOpen: boolean;
  onClose: () => void;
}

function UserSidePanel({ user, isOpen, onClose }: UserSidePanelProps) {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsClosing(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!isOpen || !user) return null;

  return (
    <div className={styles.overlay} onClick={handleClose} data-testid="sidepanel-overlay">
      <div className={`${styles.panel} ${isClosing ? styles.closing : ''}`} onClick={(e) => e.stopPropagation()} data-testid="sidepanel-panel">
        <button className={styles.closeButton} onClick={handleClose} aria-label="Close side panel" data-testid="sidepanel-close">
          <X size={20} />
        </button>

        <div className={styles.content}>
          <div className={styles.userInfo}>
            <img
              src={user.avatar}
              alt={`${user.name} avatar`}
              className={styles.avatar}
            />
            <h3 className={styles.userName} data-testid="sidepanel-name">{user.name}</h3>
            <p className={styles.userEmail} data-testid="sidepanel-email">{user.email}</p>
            <div className={styles.badges}>
              <Badge kind="role" variant={user.role}>{user.role}</Badge>
              <Badge kind="status" variant={user.status}>{user.status}</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSidePanel;
