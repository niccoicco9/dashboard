import type { ReactNode, HTMLAttributes } from 'react';
import styles from './typography.module.scss';

type TypographyVariant = 'title' | 'subtitle' | 'body';

interface TypographyProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
  variant: TypographyVariant;
  className?: string;
}

export default function Typography({ children, variant, className = '', ...rest }: TypographyProps) {
  const variantClass = styles[variant];
  const combinedClassName = `${variantClass} ${className}`.trim();

  return (
    <p className={combinedClassName} style={{ margin: 0 }} {...rest}>
      {children}
    </p>
  );
}


