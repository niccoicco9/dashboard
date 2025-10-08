import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Button from './button';

describe('Button', () => {
  const mockOnClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders button with title', () => {
    render(<Button onClick={mockOnClick} title="Test Button" />);
    
    expect(screen.getByText('Test Button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders button with icon', () => {
    const icon = <span data-testid="test-icon">Icon</span>;
    render(<Button onClick={mockOnClick} icon={icon} />);
    
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('renders button with both title and icon', () => {
    const icon = <span data-testid="test-icon">Icon</span>;
    render(<Button onClick={mockOnClick} title="Test Button" icon={icon} />);
    
    expect(screen.getByText('Test Button')).toBeInTheDocument();
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    render(<Button onClick={mockOnClick} title="Test Button" />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('supports variant prop without throwing', () => {
    render(<Button onClick={mockOnClick} title="Contained" variant="contained" />);
    expect(screen.getByRole('button', { name: 'Contained' })).toBeInTheDocument();
  });

  it('handles keyboard navigation', () => {
    render(<Button onClick={mockOnClick} title="Test Button" />);
    
    const button = screen.getByRole('button');
    button.focus();
    
    expect(button).toHaveFocus();
  });

  it('is accessible', () => {
    render(<Button onClick={mockOnClick} title="Test Button" />);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
  });
});
