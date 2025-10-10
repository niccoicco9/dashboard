import { useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import Button from '@/components/input/button/button';
import { errorBus, GlobalErrorEvent } from '@/lib/error-bus';
import styles from '@/components/error/global-error-handler.module.scss';
import Typography from '@/components/input/typography/typography';


interface GlobalErrorHandlerProps {
  onRetry?: () => void;
}

export default function GlobalErrorHandler({ onRetry }: GlobalErrorHandlerProps) {
  const [error, setError] = useState<GlobalErrorEvent | null>(null);

  useEffect(() => {
    return errorBus.subscribe(setError);
  }, []);

  if (!error) return null;

  const close = () => setError(null);

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.title}>
            <AlertTriangle size={20} />
            <Typography variant="subtitle">Something went wrong</Typography>
          </div>
        </div>
        <div className={styles.body}>
          <Typography variant="body" className={styles.message}>{error.message}</Typography>
        </div>
        <div className={styles.footer}>
          <Button title="Try Again" onClick={() => { close(); onRetry && onRetry(); }} variant="contained" tone="accent" />
        </div>
      </div>
    </div>
  );
}
