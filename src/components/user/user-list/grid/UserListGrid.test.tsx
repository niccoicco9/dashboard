import { render, screen, fireEvent } from '@testing-library/react';
import UserListGrid from './UserListGrid';

const users = [
  { id: '1', name: 'Alice', email: 'a@example.com', role: 'admin', status: 'active', avatar: '' },
  { id: '2', name: 'Bob', email: 'b@example.com', role: 'user', status: 'active', avatar: '' },
];

it('renders UserCard items and handles click', () => {
  const onUserClick = vi.fn();
  render(<UserListGrid users={users as any} onUserClick={onUserClick} />);

  const cards = screen.getAllByTestId('user-card');
  expect(cards.length).toBe(2);

  fireEvent.click(cards[0]);
  expect(onUserClick).toHaveBeenCalledTimes(1);
});

it('renders NoUsers when list is empty', () => {
  render(<UserListGrid users={[]} onUserClick={() => {}} />);
  expect(screen.getByTestId('no-users')).toBeInTheDocument();
});


