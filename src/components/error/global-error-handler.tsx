import { useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import Modal from '@/components/modal/modal';
import { errorBus, GlobalErrorEvent } from '@/lib/error-bus';
import { ERROR_MODAL_TITLE, ERROR_MODAL_RETRY_BUTTON } from '@/consts/text.const';


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
    <Modal 
      isOpen={!!error} 
      onClose={close} 
      closeOnOverlayClick={false}
      icon={<AlertTriangle size={20} />}
      title={ERROR_MODAL_TITLE}
      message={error?.message}
      confirmButtonText={ERROR_MODAL_RETRY_BUTTON}
      onConfirm={() => { 
        close(); 
        onRetry && onRetry(); 
      }}
    />
  );
}
