import { render, screen } from '@testing-library/react';
import NoUsers from './no-users';

describe('NoUsers', () => {
  it('renders no users message with icon', () => {
    render(<NoUsers />);
    
    expect(screen.getByText('No users found')).toBeInTheDocument();
    expect(screen.getByText('Try adjusting your search or filter criteria to find what you\'re looking for.')).toBeInTheDocument();
  });

  it('has proper wrapper test id', () => {
    render(<NoUsers />);
    expect(screen.getByTestId('no-users')).toBeInTheDocument();
  });

  it('displays icon with correct size', () => {
    render(<NoUsers />);
    
    const icon = screen.getByTestId('users-icon');
    expect(icon).toBeInTheDocument();
  });
});
