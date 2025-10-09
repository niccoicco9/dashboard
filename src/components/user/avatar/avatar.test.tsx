import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Avatar from './avatar';

describe('Avatar', () => {
  it('renders image when src is valid', () => {
    render(<Avatar src="https://example.com/img.jpg" name="John Doe" alt="JD" />);
    const img = screen.getByAltText('JD') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('https://example.com/img.jpg');
  });

  it('falls back to initials when image errors', () => {
    render(<Avatar src="bad.jpg" name="John Doe" />);
    // trigger error
    const img = screen.getByAltText(/avatar/i) as HTMLImageElement;
    vi.spyOn(img, 'naturalWidth', 'get').mockReturnValue(0);
    img.onerror && img.onerror(new Event('error'));
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('shows single initial if only first name provided', () => {
    render(<Avatar name="Madonna" />);
    expect(screen.getByText('M')).toBeInTheDocument();
  });
});


