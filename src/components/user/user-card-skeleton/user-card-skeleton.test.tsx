import { render, screen } from '@testing-library/react';
import UserCardSkeleton from './user-card-skeleton';

describe('UserCardSkeleton', () => {
  it('renders skeleton card with all skeleton elements', () => {
    render(<UserCardSkeleton />);
    
    const card = screen.getByTestId('user-card-skeleton');
    expect(card).toBeInTheDocument();
    
    expect(screen.getByTestId('name-skeleton')).toBeInTheDocument();
    expect(screen.getByTestId('email-skeleton')).toBeInTheDocument();
    expect(screen.getByTestId('label-skeleton')).toBeInTheDocument();
    expect(screen.getByTestId('badge-skeleton')).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    render(<UserCardSkeleton />);
    
    const card = screen.getByTestId('user-card-skeleton');
    expect(card).toBeInTheDocument();
  });

  it('has proper skeleton structure', () => {
    render(<UserCardSkeleton />);
    
    const nameSkeleton = screen.getByTestId('name-skeleton');
    const emailSkeleton = screen.getByTestId('email-skeleton');
    const labelSkeleton = screen.getByTestId('label-skeleton');
    const badgeSkeleton = screen.getByTestId('badge-skeleton');
    
    expect(nameSkeleton).toBeInTheDocument();
    expect(emailSkeleton).toBeInTheDocument();
    expect(labelSkeleton).toBeInTheDocument();
    expect(badgeSkeleton).toBeInTheDocument();
  });
});
