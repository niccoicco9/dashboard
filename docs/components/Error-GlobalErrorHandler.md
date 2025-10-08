## GlobalErrorHandler

Listens to `errorBus` and displays a modal with the latest error. Includes a retry action.

Props:
- `onRetry?: () => void`

Usage:
```tsx
import GlobalErrorHandler from '@/components/error/global-error-handler';

<GlobalErrorHandler onRetry={() => window.location.reload()} />
```

