import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import UserList from './user-list';
import { userService } from '@/services/user.service';
import { SEARCH_PLACEHOLDER } from '@/consts/text.const';

vi.mock('@/services/user.service');

const mockUsers = [
  { id: 1, name: 'Alice Admin', email: 'alice@ex.com', role: 'admin', status: 'active', avatar: '', username: '', phone: '', website: '', address: { street: '', suite: '', city: '', zipcode: '', geo: { lat: '', lng: '' } }, company: { name: '', catchPhrase: '', bs: '' } },
  { id: 2, name: 'Bob User', email: 'bob@ex.com', role: 'user', status: 'active', avatar: '', username: '', phone: '', website: '', address: { street: '', suite: '', city: '', zipcode: '', geo: { lat: '', lng: '' } }, company: { name: '', catchPhrase: '', bs: '' } },
  { id: 3, name: 'Brenda Moderator', email: 'brenda@ex.com', role: 'moderator', status: 'inactive', avatar: '', username: '', phone: '', website: '', address: { street: '', suite: '', city: '', zipcode: '', geo: { lat: '', lng: '' } }, company: { name: '', catchPhrase: '', bs: '' } },
] as const;

describe('UserList integration - search and role filter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(userService.getUsers).mockResolvedValue({ users: mockUsers as any, hasMore: false, total: mockUsers.length });
  });

  it('filters by search query', async () => {
    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText('Alice Admin')).toBeInTheDocument();
      expect(screen.getByText('Bob User')).toBeInTheDocument();
      expect(screen.getByText('Brenda Moderator')).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText(SEARCH_PLACEHOLDER);
    fireEvent.change(input, { target: { value: 'Bob' } });

    expect(screen.queryByText('Alice Admin')).toBeNull();
    expect(screen.getByText('Bob User')).toBeInTheDocument();
    expect(screen.queryByText('Brenda Moderator')).toBeNull();
  });

  it('filters by role selection', async () => {
    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText('Alice Admin')).toBeInTheDocument();
    });

    const select = screen.getByRole('combobox');

    expect(select).toBeInTheDocument();

    fireEvent.change(select, { target: { value: 'admin' } });

    expect(screen.getByText('Alice Admin')).toBeInTheDocument();
    expect(screen.queryByText('Bob User')).toBeNull();
    expect(screen.queryByText('Brenda Moderator')).toBeNull();

    fireEvent.change(select, { target: { value: 'user' } });
    expect(screen.getByText('Bob User')).toBeInTheDocument();
    expect(screen.queryByText('Alice Admin')).toBeNull();

    fireEvent.change(select, { target: { value: 'all' } });
    expect(screen.getByText('Alice Admin')).toBeInTheDocument();
    expect(screen.getByText('Bob User')).toBeInTheDocument();
  });

  it('combines search and role filter', async () => {
    render(<UserList />);
    await waitFor(() => {
      expect(screen.getByText('Alice Admin')).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText(SEARCH_PLACEHOLDER);
    const select = screen.getByRole('combobox');

    fireEvent.change(select, { target: { value: 'admin' } });
    fireEvent.change(input, { target: { value: 'Alice' } });

    expect(screen.getByText('Alice Admin')).toBeInTheDocument();
    expect(screen.queryByText('Bob User')).toBeNull();
    expect(screen.queryByText('Brenda Moderator')).toBeNull();
  });
});


