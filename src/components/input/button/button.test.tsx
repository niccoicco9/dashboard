import { render, screen, fireEvent } from '@testing-library/react';
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

  it('applies outlined variant by default', () => {
    render(<Button onClick={mockOnClick} title="Test Button" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('text-gray-600', 'hover:text-gray-800', 'border', 'border-gray-200');
  });

  it('applies contained variant when specified', () => {
    render(<Button onClick={mockOnClick} title="Test Button" variant="contained" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-gray-800', 'text-white', 'border-gray-800');
  });

  it('applies base classes', () => {
    render(<Button onClick={mockOnClick} title="Test Button" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'group',
      'flex',
      'items-center',
      'gap-1.5',
      'px-3',
      'py-1.5',
      'rounded-md',
      'text-sm',
      'font-medium',
      'transition-all',
      'duration-200',
      'focus:outline-none',
      'focus:ring-1',
      'cursor-pointer',
      'min-w-fit'
    );
  });

  it('applies dark mode classes for outlined variant', () => {
    render(<Button onClick={mockOnClick} title="Test Button" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'dark:text-gray-300',
      'dark:hover:text-white',
      'dark:hover:bg-gray-900',
      'dark:focus:ring-gray-800',
      'dark:border-gray-800'
    );
  });

  it('applies dark mode classes for contained variant', () => {
    render(<Button onClick={mockOnClick} title="Test Button" variant="contained" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'dark:bg-white',
      'dark:text-black',
      'dark:hover:bg-gray-100',
      'dark:border-white'
    );
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
