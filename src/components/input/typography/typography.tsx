import type { ReactNode, HTMLAttributes } from 'react';

type TypographyVariant = 'subtitle' | 'body';

interface TypographyProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
  variant: TypographyVariant;
  className?: string;
}

export default function Typography({ children, variant, className = '', ...rest }: TypographyProps) {
  const base: Record<TypographyVariant, string> = {
    subtitle: 'text-2xl',
    body: 'text-sm text-gray-600',
  };

  return (
    <p className={`${base[variant]} ${className}`.trim()} style={{ margin: 0 }} {...rest}>
      {children}
    </p>
  );
}


