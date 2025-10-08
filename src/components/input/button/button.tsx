type ButtonVariant = "outlined" | "contained";
type ButtonTone = "accent" | "primary";

interface ButtonProps {
  onClick: () => void;
  title?: string;
  icon?: React.ReactNode;
  variant?: ButtonVariant;
  tone?: ButtonTone;
  disableHoverOnClick?: boolean;
}

import styles from './button.module.scss';
import { useState } from 'react';

function Button({
  title,
  onClick,
  icon,
  variant = "outlined",
  tone = "accent",
  disableHoverOnClick = false,
}: Readonly<ButtonProps>) {
  const [noHover, setNoHover] = useState(false);
  const baseClassName = styles.button;

  const toneStyles = {
    outlined: {
      accent: styles.outlined,
      primary: styles.outlinedPrimary,
    },
    contained: {
      accent: styles.contained,
      primary: styles.containedPrimary,
    },
  } as const;

  const composed = `${baseClassName} ${toneStyles[variant][tone]} ${disableHoverOnClick && noHover ? styles.noHover : ''}`;

  return (
    <button
      type="button"
      className={composed}
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
