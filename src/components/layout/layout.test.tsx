import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Layout from './layout';

// Mock the Header component
vi.mock('../header/header', () => ({
  default: () => <div data-testid="header">Header Component</div>,
}));

// Mock the Outlet component
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    Outlet: () => <div data-testid="outlet">Outlet Content</div>,
  };
});

const renderLayout = () => {
  return render(
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
};

describe('Layout', () => {
  it('renders header component', () => {
    renderLayout();
    
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByText('Header Component')).toBeInTheDocument();
  });

  it('renders outlet content', () => {
    renderLayout();
    
    expect(screen.getByTestId('outlet')).toBeInTheDocument();
    expect(screen.getByText('Outlet Content')).toBeInTheDocument();
  });

  it('has proper layout structure', () => {
    renderLayout();
    
    const container = screen.getByTestId('header').closest('div');
    expect(container).toHaveClass('min-h-screen', 'bg-white', 'dark:bg-black');
  });

  it('applies dark mode classes', () => {
    renderLayout();
    
    const container = screen.getByTestId('header').closest('div');
    expect(container).toHaveClass('dark:bg-black');
  });

  it('has proper content wrapper', () => {
    renderLayout();
    
    const contentWrapper = screen.getByTestId('outlet').closest('div');
    expect(contentWrapper).toHaveClass(
      'max-w-5xl',
      'mx-auto',
      'px-4',
      'py-6',
      'mt-14'
    );
  });

  it('renders all components in correct order', () => {
    renderLayout();
    
    const container = screen.getByTestId('header').closest('div');
    const header = screen.getByTestId('header');
    const outlet = screen.getByTestId('outlet');
    
    expect(container).toBeTruthy();
    expect(container).toContainElement(header);
    expect(container).toContainElement(outlet);
    
    // Header should come before outlet
    expect(container!.children[0]).toBe(header);
  });
});
