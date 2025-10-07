import { render, screen } from '@testing-library/react';
import { UserWithRole } from '../../../types/user.types';
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
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('admin')).toBeInTheDocument();
    expect(screen.getByText('active')).toBeInTheDocument();
  });

  it('displays user avatar', () => {
    render(<UserCard user={mockUser} />);
    
    const avatar = screen.getByAltText('John Doe avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', 'https://i.pravatar.cc/150?img=1');
  });

  it('applies correct role styling for admin', () => {
    render(<UserCard user={mockUser} />);
    
    const roleBadge = screen.getByText('admin');
    expect(roleBadge).toHaveClass('bg-purple-100', 'text-purple-800');
  });

  it('applies correct status styling for active', () => {
    render(<UserCard user={mockUser} />);
    
    const statusBadge = screen.getByText('active');
    expect(statusBadge).toHaveClass('bg-green-100', 'text-green-800');
  });

  it('applies correct role styling for user role', () => {
    const userWithUserRole = { ...mockUser, role: 'user' as const };
    render(<UserCard user={userWithUserRole} />);
    
    const roleBadge = screen.getByText('user');
    expect(roleBadge).toHaveClass('bg-gray-100', 'text-gray-800');
  });

  it('applies correct role styling for moderator role', () => {
    const userWithModeratorRole = { ...mockUser, role: 'moderator' as const };
    render(<UserCard user={userWithModeratorRole} />);
    
    const roleBadge = screen.getByText('moderator');
    expect(roleBadge).toHaveClass('bg-blue-100', 'text-blue-800');
  });

  it('applies correct status styling for inactive', () => {
    const inactiveUser = { ...mockUser, status: 'inactive' as const };
    render(<UserCard user={inactiveUser} />);
    
    const statusBadge = screen.getByText('inactive');
    expect(statusBadge).toHaveClass('bg-red-100', 'text-red-800');
  });

  it('applies correct status styling for pending', () => {
    const pendingUser = { ...mockUser, status: 'pending' as const };
    render(<UserCard user={pendingUser} />);
    
    const statusBadge = screen.getByText('pending');
    expect(statusBadge).toHaveClass('bg-yellow-100', 'text-yellow-800');
  });

  it('has proper card structure and classes', () => {
    render(<UserCard user={mockUser} />);
    
    const card = screen.getByText('John Doe').closest('div');
    expect(card).toHaveClass('bg-white', 'dark:bg-gray-800', 'rounded-lg', 'shadow-sm');
  });

  it('truncates long names and emails', () => {
    const userWithLongName = {
      ...mockUser,
      name: 'Very Long Name That Should Be Truncated',
      email: 'very.long.email.address.that.should.be.truncated@example.com',
    };
    
    render(<UserCard user={userWithLongName} />);
    
    const nameElement = screen.getByText('Very Long Name That Should Be Truncated');
    const emailElement = screen.getByText('very.long.email.address.that.should.be.truncated@example.com');
    
    expect(nameElement).toHaveClass('truncate');
    expect(emailElement).toHaveClass('truncate');
  });
});
