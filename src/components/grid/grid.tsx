import { ReactNode, HTMLAttributes, forwardRef } from 'react';
import styles from '@/components/grid/grid.module.scss';

type ColumnsConfig = {
  sm?: number;
  lg?: number;
  xl?: number;
};

interface GridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: ColumnsConfig;
  gapPx?: number;
  className?: string;
  children: ReactNode;
}

const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ columns, gapPx, className, children, style, ...rest }, ref) => {
    type CSSVars = Record<`--${string}`, string>;
    const inlineVars: CSSVars = {} as CSSVars;
    if (columns?.sm != null) inlineVars['--cols-sm'] = String(columns.sm);
    if (columns?.lg != null) inlineVars['--cols-lg'] = String(columns.lg);
    if (columns?.xl != null) inlineVars['--cols-xl'] = String(columns.xl);
    if (typeof gapPx === 'number') inlineVars['--grid-gap'] = `${gapPx}px`;

    return (
      <div
        ref={ref}
        className={`${styles.grid}${className ? ` ${className}` : ''}`}
        style={{ ...inlineVars, ...(style || {}) }}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

export default Grid;


