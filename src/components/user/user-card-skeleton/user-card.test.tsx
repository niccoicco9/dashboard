import { render, screen } from '@testing-library/react';
import UserCardSkeleton from './user-card-skeleton';

describe('UserCardSkeleton (smoke)', () => {
  it('renders', () => {
    render(<UserCardSkeleton />);
    expect(screen.getByTestId('user-card-skeleton')).toBeInTheDocument();
  });
});
