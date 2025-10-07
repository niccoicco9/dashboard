type ButtonVariant = "outlined" | "contained";

interface ButtonProps {
  onClick: () => void;
  title?: string;
  icon?: React.ReactNode;
  variant?: ButtonVariant;
}

import styles from './button.module.scss';

function Button({
  title,
  onClick,
  icon,
  variant = "outlined",
}: Readonly<ButtonProps>) {
  const baseClassName = styles.button;

  const variantStyles = {
    outlined: styles.outlined,
    contained: styles.contained,
  } as const;

  return (
    <button
      className={`${baseClassName} ${variantStyles[variant]}`}
      onClick={onClick}
    >
      {icon}
      {title}
    </button>
  );
}

export default Button;
