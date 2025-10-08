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

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
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

function renderHeader() {
  return render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
}

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.documentElement.classList.remove('dark');
  });

  it('renders logo and title', () => {
    renderHeader();
    expect(screen.getByAltText('logo')).toBeInTheDocument();
    expect(screen.getByText('DASHBOARD')).toBeInTheDocument();
  });

  it('shows dark mode button and toggles theme', () => {
    renderHeader();
    const toggleButton = screen.getByRole('button', { name: 'Dark' });
    expect(toggleButton).toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    const lightButton = screen.getByRole('button', { name: 'Light' });
    expect(lightButton).toBeInTheDocument();
  });

  it('reloads the page when logo is clicked on home path', () => {
    const reloadMock = vi.fn();
    Object.defineProperty(window, 'location', { value: { pathname: '/', reload: reloadMock } });
    renderHeader();
    fireEvent.click(screen.getByAltText('logo'));
    expect(reloadMock).toHaveBeenCalled();
  });

  it('renders a semantic header', () => {
    renderHeader();
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});
