import styles from '@/components/user/badge/badge.module.scss';
import { Shield, ShieldCheck, User as UserIcon, CheckCircle2, XCircle, Clock } from 'lucide-react';

type RoleVariant = 'admin' | 'moderator' | 'user';
type StatusVariant = 'active' | 'inactive' | 'pending';

type BadgeProps =
  | { kind: 'role'; variant: RoleVariant; children: React.ReactNode }
  | { kind: 'status'; variant: StatusVariant; children: React.ReactNode };

function Badge(props: Readonly<BadgeProps>) {
  const base = styles.badge;

  const className =
    props.kind === 'role'
      ? `${base} ${styles[`role${capitalize(props.variant)}`]}`
      : `${base} ${styles[`status${capitalize(props.variant)}`]}`;

  const icon = getIcon(props);

  return (
    <span className={className}>
      {icon}
      {props.children}
    </span>
  );
}

function capitalize<T extends string>(s: T): Capitalize<T> {
  return (s.charAt(0).toUpperCase() + s.slice(1)) as Capitalize<T>;
}

export default Badge;

function getIcon(props: Readonly<BadgeProps>) {
  if (props.kind === 'role') {
    const iconByRole = {
      admin: <ShieldCheck className={styles.icon} aria-hidden />,
      moderator: <Shield className={styles.icon} aria-hidden />,
      user: <UserIcon className={styles.icon} aria-hidden />,
    } as const;
    return iconByRole[props.variant] ?? null;
  } else {
    const iconByStatus = {
      active: <CheckCircle2 className={styles.icon} aria-hidden />,
      inactive: <XCircle className={styles.icon} aria-hidden />,
      pending: <Clock className={styles.icon} aria-hidden />,
    } as const;
    return iconByStatus[props.variant] ?? null;
  }
}

