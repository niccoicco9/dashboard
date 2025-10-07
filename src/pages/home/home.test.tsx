import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Home from './home';

// Mock the UserList component
vi.mock('../../components/user/user-list/user-list', () => ({
  default: () => <div data-testid="user-list">UserList Component</div>,
}));

describe('Home', () => {
  it('renders the home page with user list', () => {
    render(<Home />);
    
    expect(screen.getByTestId('user-list')).toBeInTheDocument();
    expect(screen.getByText('UserList Component')).toBeInTheDocument();
  });

  it('has proper page structure', () => {
    render(<Home />);
    
    const container = screen.getByTestId('user-list').closest('div');
    expect(container).toHaveClass('space-y-6');
  });
});
