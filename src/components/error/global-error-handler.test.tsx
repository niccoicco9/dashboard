import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import GlobalErrorHandler from './global-error-handler';
import { errorBus } from '@/lib/error-bus';

// Ensure crypto.randomUUID exists in test environment
beforeAll(() => {
  if (!(globalThis as any).crypto) {
    (globalThis as any).crypto = {} as Crypto;
  }
  if (!(globalThis as any).crypto.randomUUID) {
    (globalThis as any).crypto.randomUUID = vi.fn(() => 'test-uuid');
  }
});

describe('GlobalErrorHandler', () => {
  afterEach(() => {
    // reset any open error between tests
    errorBus.emit(null);
  });

  it('renders nothing when there is no error', () => {
    render(<GlobalErrorHandler />);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('renders error modal when an error is emitted', () => {
    render(<GlobalErrorHandler />);

    errorBus.emitMessage('Test error occurred', 'network');

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Test error occurred')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
  });

  it('calls onRetry and closes when clicking Try Again', () => {
    const onRetry = vi.fn();
    render(<GlobalErrorHandler onRetry={onRetry} />);

    errorBus.emitMessage('Retryable error', 'server');

    const button = screen.getByRole('button', { name: /try again/i });
    fireEvent.click(button);

    expect(onRetry).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});


