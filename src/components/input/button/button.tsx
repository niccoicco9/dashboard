type ButtonVariant = "outlined" | "contained";

interface ButtonProps {
  onClick: () => void;
  title?: string;
  icon?: React.ReactNode;
  variant?: ButtonVariant;
  disableHoverOnClick?: boolean;
}

import styles from './button.module.scss';
import { useState } from 'react';

function Button({
  title,
  onClick,
  icon,
  variant = "outlined",
  disableHoverOnClick = false,
}: Readonly<ButtonProps>) {
  const [noHover, setNoHover] = useState(false);
  const baseClassName = styles.button;

  const variantStyles = {
    outlined: styles.outlined,
    contained: styles.contained,
  } as const;

  return (
    <button
      className={`${baseClassName} ${variantStyles[variant]} ${disableHoverOnClick && noHover ? styles.noHover : ''}`}
      onClick={() => {
        if (disableHoverOnClick) setNoHover(true);
        onClick();
      }}
      onMouseLeave={() => disableHoverOnClick && setNoHover(false)}
      onBlur={() => disableHoverOnClick && setNoHover(false)}
    >
      {icon}
      {title}
    </button>
  );
}

export default Button;
