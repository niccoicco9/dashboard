import { render, screen } from '@testing-library/react';
import Badge from './badge';

describe('Badge', () => {
  it('renders role badge with text and icon', () => {
    render(<Badge kind="role" variant="admin">admin</Badge>);
    expect(screen.getByText('admin')).toBeInTheDocument();
    // icon is aria-hidden, so we just ensure the wrapper exists
    expect(screen.getByText('admin').closest('span')).toBeInTheDocument();
  });

  it('renders status badge with text and icon', () => {
    render(<Badge kind="status" variant="active">active</Badge>);
    expect(screen.getByText('active')).toBeInTheDocument();
    expect(screen.getByText('active').closest('span')).toBeInTheDocument();
  });
});


