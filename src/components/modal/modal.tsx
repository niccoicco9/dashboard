import { ReactNode } from 'react';
import Button from '@/components/input/button/button';
import Typography from '@/components/input/typography/typography';
import styles from '@/components/modal/modal.module.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  overlayClassName?: string;
  closeOnOverlayClick?: boolean;
  icon?: ReactNode;
  title?: string;
  message?: string;
  cancelButtonText?: string;
  confirmButtonText?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
}

export default function Modal({ 
  isOpen, 
  onClose, 
  className = '', 
  overlayClassName = '',
  closeOnOverlayClick = true,
  icon,
  title,
  message,
  cancelButtonText,
  confirmButtonText,
  onCancel,
  onConfirm
}: ModalProps) {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className={`${styles.overlay} ${overlayClassName}`}
      onClick={handleOverlayClick}
      role="dialog" 
      aria-modal="true"
    >
      <div className={`${styles.modal} ${className}`}>
        {title && (
          <div className={styles.header}>
            <div className={styles.title}>
              {icon}
              <Typography variant="title">{title}</Typography>
            </div>
          </div>
        )}
        {message && (
          <div className={styles.body}>
            <Typography variant="body" className={styles.message}>{message}</Typography>
          </div>
        )}
        {(cancelButtonText || confirmButtonText) && (
          <div className={styles.footer}>
            {cancelButtonText && (
              <Button 
                title={cancelButtonText}
                onClick={onCancel || onClose}
                variant="outlined"
                tone="primary"
              />
            )}
            {confirmButtonText && onConfirm && (
              <Button 
                title={confirmButtonText}
                onClick={onConfirm}
                variant="contained"
                tone="accent"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
