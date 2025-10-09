import { UserWithRole } from '@/types/user.types';
import styles from './user-sidepanel.module.scss';
import Badge from '../badge/badge';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import Avatar from '@/components/user/avatar/avatar';
import Typography from '@/components/input/typography/typography';

interface UserSidePanelProps {
  user: UserWithRole | null;
  isOpen: boolean;
  onClose: () => void;
}

function UserSidePanel({ user, isOpen, onClose }: UserSidePanelProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [applyOpen, setApplyOpen] = useState(false);

  const openPanelAnimation = () => {
    setIsClosing(false);
    setApplyOpen(false);
    requestAnimationFrame(() => setApplyOpen(true));
  };

  const resetPanelState = () => {
    setIsClosing(false);
    setApplyOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      openPanelAnimation();
    } else {
      resetPanelState();
    }
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', onKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
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
      <div className={`${styles.panel} ${isClosing ? styles.closing : ''} ${applyOpen && !isClosing ? styles.open : ''}`} onClick={(e) => e.stopPropagation()} data-testid="sidepanel-panel">
        <button className={styles.closeButton} onClick={handleClose} aria-label="Close side panel" data-testid="sidepanel-close">
          <X size={20} />
        </button>

        <div className={styles.content}>
          <div className={styles.userInfo}>
            <Avatar src={user.avatar} name={user.name} size={96} />
            <Typography variant="subtitle" className={styles.userName} data-testid="sidepanel-name">{user.name}</Typography>
            <Typography variant="body" className={styles.userEmail} data-testid="sidepanel-email">{user.email}</Typography>
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
