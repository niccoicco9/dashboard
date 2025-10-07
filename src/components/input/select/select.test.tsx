import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Select from './select';

describe('Select', () => {
  it('renders select with all role options', () => {
    const mockOnRoleFilter = vi.fn();
    render(<Select onRoleFilter={mockOnRoleFilter} />);
    
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    
    expect(screen.getByText('All Roles')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByText('Moderator')).toBeInTheDocument();
    expect(screen.getByText('User')).toBeInTheDocument();
  });

  it('calls onRoleFilter when option is selected', () => {
    const mockOnRoleFilter = vi.fn();
    render(<Select onRoleFilter={mockOnRoleFilter} />);
    
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'admin' } });
    
    expect(mockOnRoleFilter).toHaveBeenCalledWith('admin');
  });

  it('shows clear button when role is selected', () => {
    const mockOnRoleFilter = vi.fn();
    render(<Select onRoleFilter={mockOnRoleFilter} value="admin" />);
    
    const clearButton = screen.getByRole('button');
    expect(clearButton).toBeInTheDocument();
  });

  it('calls onRoleFilter with "all" when clear button is clicked', () => {
    const mockOnRoleFilter = vi.fn();
    render(<Select onRoleFilter={mockOnRoleFilter} value="admin" />);
    
    const clearButton = screen.getByRole('button');
    fireEvent.click(clearButton);
    
    expect(mockOnRoleFilter).toHaveBeenCalledWith('all');
  });

  it('shows arrow icon when "all" is selected', () => {
    const mockOnRoleFilter = vi.fn();
    render(<Select onRoleFilter={mockOnRoleFilter} value="all" />);
    
    const arrowIcon = screen.getByTestId('select-arrow');
    expect(arrowIcon).toBeInTheDocument();
  });

  it('does not show arrow icon when role is selected', () => {
    const mockOnRoleFilter = vi.fn();
    render(<Select onRoleFilter={mockOnRoleFilter} value="admin" />);
    
    const arrowIcon = screen.queryByTestId('select-arrow');
    expect(arrowIcon).not.toBeInTheDocument();
  });
});
