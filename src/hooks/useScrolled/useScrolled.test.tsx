import { renderHook, act } from '@testing-library/react';
import { useScrolled } from './useScrolled';

describe('useScrolled', () => {
  it('initializes to false and updates after scroll', () => {
    const { result } = renderHook(() => useScrolled(10));
    expect(result.current).toBe(false);

    Object.defineProperty(window, 'scrollY', { value: 20, writable: true });
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(true);
  });
});


