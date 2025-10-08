import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Header from './header';

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

const renderHeader = () => {
  return render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
};

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.documentElement.classList.remove('dark');
  });

  it('renders header with logo and title', () => {
    renderHeader();
    
    expect(screen.getByText('USERS DASHBOARD')).toBeInTheDocument();
    expect(screen.getByAltText('logo')).toBeInTheDocument();
  });

  it('renders dark mode button with correct initial text', () => {
    renderHeader();
    
    expect(screen.getByText('Dark')).toBeInTheDocument();
  });

  it('toggles theme when button is clicked', () => {
    renderHeader();
    
    const toggleButton = screen.getByText('Dark');
    fireEvent.click(toggleButton);
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('changes button text after toggle', () => {
    renderHeader();
    
    const toggleButton = screen.getByText('Dark');
    fireEvent.click(toggleButton);
    
    expect(screen.getByText('Light')).toBeInTheDocument();
  });

  it('navigates to home when logo is clicked', () => {
    const mockNavigate = vi.fn();
    vi.mock('react-router-dom', async () => {
      const actual = await vi.importActual('react-router-dom');
      return {
        ...actual,
        useNavigate: () => mockNavigate,
      };
    });

    renderHeader();
    
    const logo = screen.getByAltText('logo');
    fireEvent.click(logo);
    
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('applies dark mode classes when theme is dark', () => {
    document.documentElement.classList.add('dark');
    renderHeader();
    
    const header = screen.getByRole('banner') || screen.getByText('USERS DASHBOARD').closest('div');
    expect(header).toHaveClass('dark:bg-black/90');
  });
});
