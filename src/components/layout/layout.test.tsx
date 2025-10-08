import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Layout from './layout';

vi.mock('../header/header', () => ({
  default: () => <div data-testid="header">Header Component</div>,
}));

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
    const header = screen.getByTestId('header');
    const outlet = screen.getByTestId('outlet');
    const root = header.parentElement; // layoutRoot
    expect(root).toBeTruthy();
    expect(root).toContainElement(header);
    expect(root).toContainElement(outlet);
  });

  it('renders under dark mode without errors', () => {
    document.documentElement.classList.add('dark');
    renderLayout();
    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();
  });

  it('has proper content wrapper', () => {
    renderLayout();
    const contentWrapper = screen.getByTestId('outlet').closest('div');
    expect(contentWrapper).toBeInTheDocument();
  });

  it('renders header before outlet in DOM order', () => {
    renderLayout();
    const header = screen.getByTestId('header');
    const outlet = screen.getByTestId('outlet');
    const relation = header.compareDocumentPosition(outlet);
    expect(relation & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
});
