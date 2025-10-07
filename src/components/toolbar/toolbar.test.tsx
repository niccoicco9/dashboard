import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Toolbar from './toolbar';

describe('Toolbar', () => {
  it('renders toolbar with title and count', () => {
    const mockOnRoleFilter = vi.fn();
    const mockOnSearch = vi.fn();
    
    render(
      <Toolbar 
        onRoleFilter={mockOnRoleFilter} 
        onSearch={mockOnSearch}
        userCount={5}
        totalCount={10}
      />
    );
    
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('5 of 10')).toBeInTheDocument();
  });

  it('renders toolbar with title only when counts are not provided', () => {
    const mockOnRoleFilter = vi.fn();
    const mockOnSearch = vi.fn();
    
    render(
      <Toolbar 
        onRoleFilter={mockOnRoleFilter} 
        onSearch={mockOnSearch}
      />
    );
    
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.queryByText('5 of 10')).not.toBeInTheDocument();
  });

  it('renders search bar and select components', () => {
    const mockOnRoleFilter = vi.fn();
    const mockOnSearch = vi.fn();
    
    render(
      <Toolbar 
        onRoleFilter={mockOnRoleFilter} 
        onSearch={mockOnSearch}
      />
    );
    
    expect(screen.getByPlaceholderText('Search by name...')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('shows same count when userCount equals totalCount', () => {
    const mockOnRoleFilter = vi.fn();
    const mockOnSearch = vi.fn();
    
    render(
      <Toolbar 
        onRoleFilter={mockOnRoleFilter} 
        onSearch={mockOnSearch}
        userCount={10}
        totalCount={10}
      />
    );
    
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.queryByText('10 of 10')).not.toBeInTheDocument();
  });
});
