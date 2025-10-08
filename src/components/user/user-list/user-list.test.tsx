import { render, waitFor } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { vi } from 'vitest';
import UserList from './user-list';
import { userService } from '../../../services/user.service';

vi.mock('../../../services/user.service');

const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    website: 'johndoe.com',
    username: 'johndoe',
    address: {
      street: '123 Main St',
      suite: 'Apt 1',
      city: 'New York',
      zipcode: '10001',
      geo: { lat: '40.7128', lng: '-74.0060' },
    },
    company: {
      name: 'Acme Corp',
      catchPhrase: 'Making the world better',
      bs: 'harness real-time e-markets',
    },
    role: 'admin' as const,
    status: 'active' as const,
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '098-765-4321',
    website: 'janesmith.com',
    username: 'janesmith',
    address: {
      street: '456 Oak Ave',
      suite: 'Suite 2',
      city: 'Los Angeles',
      zipcode: '90210',
      geo: { lat: '34.0522', lng: '-118.2437' },
    },
    company: {
      name: 'Tech Solutions',
      catchPhrase: 'Innovation at its finest',
      bs: 'revolutionize next-generation platforms',
    },
    role: 'user' as const,
    status: 'inactive' as const,
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
];

describe('UserList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    vi.mocked(userService.getUsers).mockImplementation(
      () => new Promise(() => {}) // Never resolves
    );

    render(<UserList />);
    
    expect(screen.getByText('Loading users...')).toBeInTheDocument();
    expect(screen.getByRole('status', { hidden: true })).toBeInTheDocument();
  });

  it('renders users when data is loaded', async () => {
    vi.mocked(userService.getUsers).mockResolvedValue({
      users: mockUsers,
      hasMore: false,
      total: 2
    });

    render(<UserList />);
    
    await waitFor(() => {
      expect(screen.getByText('Users (2)')).toBeInTheDocument();
    });
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('jane.smith@example.com')).toBeInTheDocument();
  });

  it('renders error state when API fails', async () => {
    vi.mocked(userService.getUsers).mockRejectedValue(new Error('API Error'));

    render(<UserList />);
    
    await waitFor(() => {
      expect(screen.getByText('⚠️ Failed to load users')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Try again')).toBeInTheDocument();
  });

  it('displays correct user count', async () => {
    vi.mocked(userService.getUsers).mockResolvedValue({
      users: mockUsers,
      hasMore: false,
      total: 2
    });

    render(<UserList />);
    
    await waitFor(() => {
      expect(screen.getByText('Users (2)')).toBeInTheDocument();
    });
  });

  it('renders user cards in grid layout', async () => {
    vi.mocked(userService.getUsers).mockResolvedValue({
      users: mockUsers,
      hasMore: false,
      total: 2
    });

    render(<UserList />);
    
    await waitFor(() => {
      const grid = screen.getByText('Users (2)').closest('div')?.querySelector('.grid');
      expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'xl:grid-cols-4');
    });
  });

  it('handles empty user list', async () => {
    vi.mocked(userService.getUsers).mockResolvedValue({
      users: [],
      hasMore: false,
      total: 0
    });

    render(<UserList />);
    
    await waitFor(() => {
      expect(screen.getByText('Users (0)')).toBeInTheDocument();
    });
  });

  it('calls userService.getUsers on mount', () => {
    vi.mocked(userService.getUsers).mockResolvedValue({
      users: mockUsers,
      hasMore: false,
      total: 2
    });

    render(<UserList />);
    
    expect(userService.getUsers).toHaveBeenCalledTimes(1);
  });

  it('retry button reloads the page', async () => {
    vi.mocked(userService.getUsers).mockRejectedValue(new Error('API Error'));
    
    const mockReload = vi.fn();
    Object.defineProperty(window, 'location', {
      value: { reload: mockReload },
      writable: true,
    });

    render(<UserList />);
    
    await waitFor(() => {
      expect(screen.getByText('Try again')).toBeInTheDocument();
    });
    
    const retryButton = screen.getByText('Try again');
    retryButton.click();
    
    expect(mockReload).toHaveBeenCalled();
  });
});
