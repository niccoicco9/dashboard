import styles from '@/components/user/user-badge/user-badge.module.scss';
import { Shield, ShieldCheck, User as UserIcon, CheckCircle2, XCircle, Clock } from 'lucide-react';
import Badge from '@/components/badge/badge';
import type { ReactElement } from 'react';

type RoleVariant = 'admin' | 'moderator' | 'user';
type StatusVariant = 'active' | 'inactive' | 'pending';

type UserBadgeProps =
  | { kind: 'role'; variant: RoleVariant; children: React.ReactNode }
  | { kind: 'status'; variant: StatusVariant; children: React.ReactNode };

export default function UserBadge(props: Readonly<UserBadgeProps>) {
  const roleIcons: Record<RoleVariant, ReactElement> = {
    admin: <ShieldCheck className={styles.icon} aria-hidden />,
    moderator: <Shield className={styles.icon} aria-hidden />,
    user: <UserIcon className={styles.icon} aria-hidden />,
  };

  const statusIcons: Record<StatusVariant, ReactElement> = {
    active: <CheckCircle2 className={styles.icon} aria-hidden />,
    inactive: <XCircle className={styles.icon} aria-hidden />,
    pending: <Clock className={styles.icon} aria-hidden />,
  };

  const statusToneMap: Record<StatusVariant, 'success' | 'danger' | 'warning'> = {
    active: 'success',
    inactive: 'danger',
    pending: 'warning',
  };

  const icon = props.kind === 'role' ? roleIcons[props.variant] : statusIcons[props.variant];
  const tone = props.kind === 'status' ? statusToneMap[props.variant] : undefined;
  const className = styles[`${props.kind}${capitalize(props.variant)}`];

  return (
    <Badge tone={tone} leadingIcon={icon} className={className}>
      {props.children}
    </Badge>
  );
}

function capitalize<T extends string>(s: T): Capitalize<T> {
  return (s.charAt(0).toUpperCase() + s.slice(1)) as Capitalize<T>;
}

