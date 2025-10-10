import { useEffect, useState, type ReactNode } from 'react';
import styles from '@/components/overlay/sidepanel/sidepanel.module.scss';
import { X } from 'lucide-react';

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: ReactNode;
  placement?: 'right' | 'left';
  width?: number | string;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  showCloseButton?: boolean;
}

export default function SidePanel({
  isOpen,
  onClose,
  children,
  title,
  placement = 'right',
  width = 420,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  showCloseButton = true,
}: SidePanelProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [applyOpen, setApplyOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      setApplyOpen(false);
      requestAnimationFrame(() => setApplyOpen(true));
    } else {
      setIsClosing(false);
      setApplyOpen(false);
    }
  }, [isOpen]);

  // esc handler
  useEffect(() => {
    if (!closeOnEsc || !isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, closeOnEsc]);

  function handleClose() {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  }

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={closeOnOverlayClick ? handleClose : undefined}
      data-testid="sidepanel-overlay"
    >
      <div
        className={[
          styles.panel,
          isClosing ? styles.closing : '',
          applyOpen && !isClosing ? styles.open : '',
          placement === 'left' ? styles.left : styles.right,
        ].join(' ')}
        onClick={(e) => e.stopPropagation()}
        style={{ width: typeof width === 'number' ? `${width}px` : width }}
        data-testid="sidepanel-panel"
      >
        {(title || showCloseButton) && (
          <div className={styles.header}>
            <div className={styles.title}>{title}</div>
            {showCloseButton && (
              <button
                className={styles.closeButton}
                onClick={handleClose}
                aria-label="Close side panel"
                data-testid="sidepanel-close"
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}


