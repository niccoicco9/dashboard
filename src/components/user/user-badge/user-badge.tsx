import styles from '@/components/user/user-badge/user-badge.module.scss';
import { Shield, ShieldCheck, User as UserIcon, CheckCircle2, XCircle, Clock } from 'lucide-react';
import Badge from '@/components/badge/badge';

type RoleVariant = 'admin' | 'moderator' | 'user';
type StatusVariant = 'active' | 'inactive' | 'pending';

type BadgeProps =
  | { kind: 'role'; variant: RoleVariant; children: React.ReactNode }
  | { kind: 'status'; variant: StatusVariant; children: React.ReactNode };

function UserBadge(props: Readonly<BadgeProps>) {
  const icon = getIcon(props);
  const tone = props.kind === 'role' ? mapRoleToTone(props.variant) : mapStatusToTone(props.variant);

  return (
    <Badge
      tone={props.kind === 'status' ? tone : undefined}
      leadingIcon={icon}
      className={props.kind === 'role' ? styles[`role${capitalize(props.variant)}`] : styles[`status${capitalize(props.variant)}`]}
    >
      {props.children}
    </Badge>
  );
}

function capitalize<T extends string>(s: T): Capitalize<T> {
  return (s.charAt(0).toUpperCase() + s.slice(1)) as Capitalize<T>;
}

export default UserBadge;

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

function mapRoleToTone(role: RoleVariant) {
  switch (role) {
    case 'admin':
      return 'info';
    case 'moderator':
      return 'neutral';
    case 'user':
    default:
      return 'neutral';
  }
}

function mapStatusToTone(status: StatusVariant) {
  switch (status) {
    case 'active':
      return 'success';
    case 'inactive':
      return 'danger';
    case 'pending':
    default:
      return 'warning';
  }
}

