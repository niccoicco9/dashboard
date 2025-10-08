export type GlobalErrorType = 'network' | 'server' | 'timeout' | 'unknown';

export interface GlobalErrorEvent {
  id: string;
  message: string;
  type: GlobalErrorType;
  time: number;
}

// Very small pub/sub utility for app-wide error events
class ErrorBus {
  private listeners: Set<(error: GlobalErrorEvent | null) => void> = new Set();

  subscribe(listener: (error: GlobalErrorEvent | null) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  emit(error: GlobalErrorEvent | null) {
    this.listeners.forEach((l) => l(error));
  }

  emitMessage(message: string, type: GlobalErrorType = 'unknown') {
    this.emit({ id: crypto.randomUUID(), message, type, time: Date.now() });
  }
}

export const errorBus = new ErrorBus();
