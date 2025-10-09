import { render, screen, fireEvent } from '@testing-library/react';
import UserSidePanel from './user-sidepanel';

const user = {
  id: 1,
  name: 'John Doe',
  email: 'john@ex.com',
  role: 'admin',
  status: 'active',
  avatar: 'https://i.pravatar.cc/150?img=1',
  username: '',
  phone: '',
  website: '',
  address: { street: '', suite: '', city: '', zipcode: '', geo: { lat: '', lng: '' } },
  company: { name: '', catchPhrase: '', bs: '' },
} as const;

describe('UserSidePanel', () => {
  it('renders nothing when closed', () => {
    render(<UserSidePanel user={user as any} isOpen={false} onClose={() => {}} />);
    expect(screen.queryByTestId('sidepanel-panel')).toBeNull();
  });

  it('renders name and email when open', () => {
    render(<UserSidePanel user={user as any} isOpen={true} onClose={() => {}} />);
    expect(screen.getByTestId('sidepanel-name')).toHaveTextContent('John Doe');
    expect(screen.getByTestId('sidepanel-email')).toHaveTextContent('john@ex.com');
  });

  it('closes when close button is clicked', () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    render(<UserSidePanel user={user as any} isOpen={true} onClose={onClose} />);
    fireEvent.click(screen.getByTestId('sidepanel-close'));
    vi.runAllTimers();
    expect(onClose).toHaveBeenCalled();
    vi.useRealTimers();
  });
});


