import { useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import Button from '../input/button/button';
import { errorBus, GlobalErrorEvent } from '../../lib/error-bus';
import styles from './global-error-handler.module.scss';


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
          <div className={styles.title}><AlertTriangle size={20} /><span>Something went wrong</span></div>
        </div>
        <div className={styles.body}>
          <p className={styles.message}>{error.message}</p>
        </div>
        <div className={styles.footer}>
          <Button title="Try Again" onClick={() => { close(); onRetry && onRetry(); }} variant="contained" tone="accent" />
        </div>
      </div>
    </div>
  );
}
