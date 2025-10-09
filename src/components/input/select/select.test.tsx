import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Select from './select';

describe('Select', () => {
  it('renders select with provided options', () => {
    const mockOnRoleFilter = vi.fn();
    const opts = [
      { value: 'all', label: 'All' },
      { value: 'a', label: 'A' },
      { value: 'b', label: 'B' },
    ];
    render(<Select onRoleFilter={mockOnRoleFilter} options={opts} />);
    
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  it('calls onRoleFilter when option is selected', () => {
    const mockOnRoleFilter = vi.fn();
    const opts = [
      { value: 'all', label: 'All' },
      { value: 'admin', label: 'Admin' },
    ];
    render(<Select onRoleFilter={mockOnRoleFilter} options={opts} />);
    
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'admin' } });
    
    expect(mockOnRoleFilter).toHaveBeenCalledWith('admin');
  });

  it('shows clear button when non-default is selected', () => {
    const mockOnRoleFilter = vi.fn();
    const opts = [
      { value: 'all', label: 'All' },
      { value: 'admin', label: 'Admin' },
    ];
    render(<Select onRoleFilter={mockOnRoleFilter} value="admin" options={opts} />);
    
    const clearButton = screen.getByRole('button');
    expect(clearButton).toBeInTheDocument();
  });

  it('calls onRoleFilter with default when clear button is clicked', () => {
    const mockOnRoleFilter = vi.fn();
    const opts = [
      { value: 'all', label: 'All' },
      { value: 'admin', label: 'Admin' },
    ];
    render(<Select onRoleFilter={mockOnRoleFilter} value="admin" options={opts} />);
    
    const clearButton = screen.getByRole('button');
    fireEvent.click(clearButton);
    
    expect(mockOnRoleFilter).toHaveBeenCalledWith('all');
  });

  it('shows arrow icon when default is selected', () => {
    const mockOnRoleFilter = vi.fn();
    const opts = [
      { value: 'all', label: 'All' },
      { value: 'admin', label: 'Admin' },
    ];
    render(<Select onRoleFilter={mockOnRoleFilter} value="all" options={opts} />);
    
    const arrowIcon = screen.getByTestId('select-arrow');
    expect(arrowIcon).toBeInTheDocument();
  });

  it('does not show arrow icon when non-default is selected', () => {
    const mockOnRoleFilter = vi.fn();
    const opts = [
      { value: 'all', label: 'All' },
      { value: 'admin', label: 'Admin' },
    ];
    render(<Select onRoleFilter={mockOnRoleFilter} value="admin" options={opts} />);
    
    const arrowIcon = screen.queryByTestId('select-arrow');
    expect(arrowIcon).not.toBeInTheDocument();
  });
});
