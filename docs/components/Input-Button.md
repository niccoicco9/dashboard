## Button

Action button with variants and tones.

Props:
- `onClick: () => void` (required)
- `title?: string`
- `icon?: React.ReactNode`
- `variant?: 'outlined' | 'contained'` (default: `'outlined'`)
- `tone?: 'accent' | 'primary'` (default: `'accent'`)
- `disableHoverOnClick?: boolean` (default: `false`)

Usage:
```tsx
import Button from '@/components/input/button/button';

<Button title="Save" variant="contained" tone="primary" onClick={() => {}} />
```

