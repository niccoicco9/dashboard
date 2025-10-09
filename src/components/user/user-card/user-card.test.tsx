import { render, screen, fireEvent } from '@testing-library/react';
import { UserWithRole } from '@/types/user.types';
import { vi } from 'vitest';
import UserCard from './user-card';

const mockUser: UserWithRole = {
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
    geo: {
      lat: '40.7128',
      lng: '-74.0060',
    },
  },
  company: {
    name: 'Acme Corp',
    catchPhrase: 'Making the world better',
    bs: 'harness real-time e-markets',
  },
  role: 'admin',
  status: 'active',
  avatar: 'https://i.pravatar.cc/150?img=1',
};

describe('UserCard', () => {
  it('renders user information correctly', () => {
    render(<UserCard user={mockUser} />);
    
    expect(screen.getByTestId('user-name')).toHaveTextContent('John Doe');
    expect(screen.getByTestId('user-email')).toHaveTextContent('john.doe@example.com');
    expect(screen.getByTestId('user-role')).toHaveTextContent('admin');
  });

  it('handles click via onClick', () => {
    const onClick = vi.fn();
    render(<UserCard user={mockUser} onClick={onClick} />);
    fireEvent.click(screen.getByTestId('user-card'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders role content', () => {
    render(<UserCard user={mockUser} />);
    expect(screen.getByTestId('user-role')).toHaveTextContent('admin');
  });

  it('supports user role text', () => {
    const userWithUserRole = { ...mockUser, role: 'user' as const };
    render(<UserCard user={userWithUserRole} />);
    
    expect(screen.getByTestId('user-role')).toHaveTextContent('user');
  });

  it('supports moderator role text', () => {
    const userWithModeratorRole = { ...mockUser, role: 'moderator' as const };
    render(<UserCard user={userWithModeratorRole} />);
    
    expect(screen.getByTestId('user-role')).toHaveTextContent('moderator');
  });

  it('supports inactive status text', () => {
    const inactiveUser = { ...mockUser, status: 'inactive' as const };
    render(<UserCard user={inactiveUser} />);
    
  });

  it('supports pending status text', () => {
    const pendingUser = { ...mockUser, status: 'pending' as const };
    render(<UserCard user={pendingUser} />);
    
  });


  it('renders long names and emails', () => {
    const userWithLongName = {
      ...mockUser,
      name: 'Very Long Name That Should Be Truncated',
      email: 'very.long.email.address.that.should.be.truncated@example.com',
    };
    
    render(<UserCard user={userWithLongName} />);
    
    expect(screen.getByTestId('user-name')).toHaveTextContent('Very Long Name That Should Be Truncated');
    expect(screen.getByTestId('user-email')).toHaveTextContent('very.long.email.address.that.should.be.truncated@example.com');
  });
});
