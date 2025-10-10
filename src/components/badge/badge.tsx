import { ReactNode } from 'react';
import { CheckCircle2, Info, TriangleAlert, XCircle } from 'lucide-react';
import styles from '@/components/badge/badge.module.scss';

type BadgeTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger';

interface BadgeProps {
  tone?: BadgeTone;
  leadingIcon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function Badge({ tone, leadingIcon, children, className }: BadgeProps) {
  const toneClass = tone ? ` ${styles[tone]}` : '';
  const classes = `${styles.badge}${toneClass}${className ? ` ${className}` : ''}`;
  return (
    <span className={classes}>
      {leadingIcon}
      {children}
    </span>
  );
}

export const BadgeIcons = {
  info: <Info className={styles.icon} aria-hidden />,
  success: <CheckCircle2 className={styles.icon} aria-hidden />,
  warning: <TriangleAlert className={styles.icon} aria-hidden />,
  danger: <XCircle className={styles.icon} aria-hidden />,
};


