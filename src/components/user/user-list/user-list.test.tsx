import { render, screen, fireEvent, within, waitFor } from '@testing-library/react';
import { SEARCH_PLACEHOLDER } from '@/consts/text.const';
import { vi } from 'vitest';
import UserList from './user-list';

const mockUsers = [
  { 
    id: 1, 
    name: 'Alice Johnson', 
    email: 'alice@example.com', 
    role: 'admin', 
    status: 'active', 
    avatar: '',
  },
  { 
    id: 2, 
    name: 'Bob Smith', 
    email: 'bob@example.com', 
    role: 'user', 
    status: 'inactive', 
    avatar: '',
  },
  { 
    id: 3, 
    name: 'Carol Doe', 
    email: 'carol@example.com', 
    role: 'moderator', 
    status: 'pending', 
    avatar: '',
  },
  { 
    id: 4, 
    name: 'Alina Ray', 
    email: 'alina@example.com', 
    role: 'user', 
    status: 'active', 
    avatar: '',
  },
];

vi.mock('@/hooks/useInfiniteScroll/useInfiniteScroll', () => {
  return {
    useInfiniteScroll: () => ({
      users: mockUsers,
      loading: false,
      error: null,
      hasMore: false,
      loadMore: vi.fn(),
      total: mockUsers.length,
      isLoadingMore: false,
    }),
  };
});

describe('UserList', () => {
  describe('User List Rendering', () => {
    it('renders users grid with cards', () => {
      render(<UserList />);
      const cards = screen.getAllByTestId('user-card');
      expect(cards.length).toBe(4);
    });

    it('displays user information correctly', () => {
      render(<UserList />);
      
      expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
      expect(screen.getByText('Bob Smith')).toBeInTheDocument();
      expect(screen.getByText('Carol Doe')).toBeInTheDocument();
      expect(screen.getByText('Alina Ray')).toBeInTheDocument();
      
      expect(screen.getByText('alice@example.com')).toBeInTheDocument();
      expect(screen.getByText('bob@example.com')).toBeInTheDocument();
      expect(screen.getByText('carol@example.com')).toBeInTheDocument();
      expect(screen.getByText('alina@example.com')).toBeInTheDocument();
    });

    it('displays user roles correctly', () => {
      render(<UserList />);
      
      expect(screen.getByText('admin')).toBeInTheDocument();
      expect(screen.getAllByText('user')).toHaveLength(2);
      expect(screen.getByText('moderator')).toBeInTheDocument();
    });

    it('shows user count in toolbar', () => {
      render(<UserList />);
      
      expect(screen.getByText(/Users:/)).toBeInTheDocument();
      expect(screen.getByText(/4/)).toBeInTheDocument();
    });
  });

  describe('Filtering Logic', () => {
    it('filters by role selection', async () => {
      render(<UserList />);
      
      const select = screen.getByRole('combobox');
      fireEvent.change(select, { target: { value: 'admin' } });
      
      await waitFor(() => {
        const cards = screen.getAllByTestId('user-card');
        expect(cards.length).toBe(1);
        expect(within(cards[0]).getByTestId('user-name').textContent).toMatch(/alice/i);
      });
    });

    it('filters by search query', async () => {
      render(<UserList />);
      
      const input = screen.getByPlaceholderText(SEARCH_PLACEHOLDER);
      fireEvent.change(input, { target: { value: 'ali' } });
      
      await waitFor(() => {
        const cards = screen.getAllByTestId('user-card');
        expect(cards.length).toBe(2);
        expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
        expect(screen.getByText('Alina Ray')).toBeInTheDocument();
      });
    });

    it('filters by combined search and role', async () => {
      render(<UserList />);
      
      const select = screen.getByRole('combobox');
      fireEvent.change(select, { target: { value: 'user' } });
      
      const input = screen.getByPlaceholderText(SEARCH_PLACEHOLDER);
      fireEvent.change(input, { target: { value: 'ali' } });
      
      await waitFor(() => {
        const cards = screen.getAllByTestId('user-card');
        expect(cards.length).toBe(1);
        expect(screen.getByText('Alina Ray')).toBeInTheDocument();
        expect(screen.queryByText('Alice Johnson')).not.toBeInTheDocument();
      });
    });

    it('shows no results when search has no matches', async () => {
      render(<UserList />);
      
      const input = screen.getByPlaceholderText(SEARCH_PLACEHOLDER);
      fireEvent.change(input, { target: { value: 'nonexistent' } });
      
      await waitFor(() => {
        const cards = screen.queryAllByTestId('user-card');
        expect(cards.length).toBe(0);
      });
    });

    it('shows no results when role filter has no matches', async () => {
      render(<UserList />);
      
      const select = screen.getByRole('combobox');
      fireEvent.change(select, { target: { value: 'nonexistent-role' } });
      
      await waitFor(() => {
        const cards = screen.queryAllByTestId('user-card');
        expect(cards.length).toBe(0);
      });
    });

    it('resets filters when search is cleared', async () => {
      render(<UserList />);
      
      const input = screen.getByPlaceholderText(SEARCH_PLACEHOLDER);
      fireEvent.change(input, { target: { value: 'ali' } });
      
      await waitFor(() => {
        const cards = screen.getAllByTestId('user-card');
        expect(cards.length).toBe(2);
      });
      
      fireEvent.change(input, { target: { value: '' } });
      
      await waitFor(() => {
        const cards = screen.getAllByTestId('user-card');
        expect(cards.length).toBe(4);
      });
    });

    it('resets filters when role is set to all', async () => {
      render(<UserList />);
      
      const select = screen.getByRole('combobox');
      fireEvent.change(select, { target: { value: 'admin' } });
      
      await waitFor(() => {
        const cards = screen.getAllByTestId('user-card');
        expect(cards.length).toBe(1);
      });
      
      fireEvent.change(select, { target: { value: 'all' } });
      await waitFor(() => {
        const cards = screen.getAllByTestId('user-card');
        expect(cards.length).toBe(4);
      });
    });
  });

  describe('User Interactions', () => {
    it('handles user card clicks', () => {
      render(<UserList />);
      
      const firstCard = screen.getAllByTestId('user-card')[0];
      fireEvent.click(firstCard);
      
      expect(firstCard).toBeInTheDocument();
    });

    it('handles search input changes', () => {
      render(<UserList />);
      
      const input = screen.getByPlaceholderText(SEARCH_PLACEHOLDER);
      fireEvent.change(input, { target: { value: 'test' } });
      
      expect(input).toHaveValue('test');
    });

    it('handles role select changes', () => {
      render(<UserList />);
      
      const select = screen.getByRole('combobox');
      fireEvent.change(select, { target: { value: 'user' } });
      
      expect(select).toHaveValue('user');
    });
  });
});


