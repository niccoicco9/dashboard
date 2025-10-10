import { type ReactNode } from 'react';
import styles from '@/components/toolbar/toolbar.module.scss';
import { useScrolled } from '@/hooks/useScrolled/useScrolled';

interface ToolbarProps {
  title?: ReactNode;
  children?: ReactNode;
  ariaLabel?: string;
  className?: string;
}

function Toolbar({ title, children, ariaLabel = 'Toolbar', className }: ToolbarProps) {
  const isScrolled = useScrolled(10);

  return (
    <div className={`${styles.toolbar} ${isScrolled ? styles.scrolled : ''} ${className ?? ''}`} role="region" aria-label={ariaLabel}>
      <div className={styles.toolbarInner}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            {title}
          </h1>
        </div>
        <div className={styles.controls}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Toolbar;
