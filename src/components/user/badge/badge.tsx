import styles from './badge.module.scss';
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
    switch (props.variant) {
      case 'admin':
        return <ShieldCheck className={styles.icon} aria-hidden />;
      case 'moderator':
        return <Shield className={styles.icon} aria-hidden />;
      case 'user':
        return <UserIcon className={styles.icon} aria-hidden />;
    }
  } else {
    switch (props.variant) {
      case 'active':
        return <CheckCircle2 className={styles.icon} aria-hidden />;
      case 'inactive':
        return <XCircle className={styles.icon} aria-hidden />;
      case 'pending':
        return <Clock className={styles.icon} aria-hidden />;
    }
  }
  return null;
}

