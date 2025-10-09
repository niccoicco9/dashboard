import { render, screen, fireEvent, within } from '@testing-library/react';
import { SEARCH_PLACEHOLDER } from '@/consts/text.const';
import { vi } from 'vitest';
import UserList from './user-list';

// Mock the infinite scroll hook to provide deterministic data
vi.mock('@/hooks/useInfiniteScroll/useInfiniteScroll', () => {
  const users = [
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'admin', status: 'active', avatar: '' },
    { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'user', status: 'inactive', avatar: '' },
    { id: '3', name: 'Carol Doe', email: 'carol@example.com', role: 'moderator', status: 'pending', avatar: '' },
    { id: '4', name: 'Alina Ray', email: 'alina@example.com', role: 'user', status: 'active', avatar: '' },
  ];
  return {
    useInfiniteScroll: () => ({
      users,
      loading: false,
      error: null,
      hasMore: false,
      loadMore: vi.fn(),
      total: users.length,
      isLoadingMore: false,
    }),
  };
});

describe('UserList', () => {
  it('renders users grid with cards', () => {
    render(<UserList />);
    const cards = screen.getAllByTestId('user-card');
    expect(cards.length).toBe(4);
  });

  it('filters by role selection', () => {
    render(<UserList />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'admin' } });
    const cards = screen.getAllByTestId('user-card');
    expect(cards.length).toBe(1);
    expect(within(cards[0]).getByTestId('user-name').textContent).toMatch(/alice/i);
  });

  it('filters by search query', () => {
    render(<UserList />);
    const input = screen.getByPlaceholderText(SEARCH_PLACEHOLDER);
    fireEvent.change(input, { target: { value: 'ali' } });
    const cards = screen.getAllByTestId('user-card');
    expect(cards.length).toBe(2);
  });
});


