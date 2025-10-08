## errorBus

Lightweight pub/sub for global error events.

Types:
```ts
type GlobalErrorType = 'network' | 'server' | 'timeout' | 'unknown';
interface GlobalErrorEvent { id: string; message: string; type: GlobalErrorType; time: number; }
```

API:
- `subscribe(listener: (error: GlobalErrorEvent | null) => void): () => void`
- `emit(error: GlobalErrorEvent | null): void`
- `emitMessage(message: string, type?: GlobalErrorType): void`

Example:
```ts
import { errorBus } from '@/lib/error-bus';

const unsubscribe = errorBus.subscribe((evt) => {
  if (evt) console.error(evt.message);
});

errorBus.emitMessage('Network down', 'network');
unsubscribe();
```

