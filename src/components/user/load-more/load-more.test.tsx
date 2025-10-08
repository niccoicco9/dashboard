import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import LoadMore from './load-more';

describe('LoadMore', () => {
  it('renders loading state when loading is true', () => {
    const mockOnLoadMore = vi.fn();
    
    render(
      <LoadMore 
        onLoadMore={mockOnLoadMore} 
        loading={true} 
        hasMore={true} 
      />
    );
    
    expect(screen.getByText('Loading more users...')).toBeInTheDocument();
  });

  it('renders trigger when not loading and has more', () => {
    const mockOnLoadMore = vi.fn();
    
    render(
      <LoadMore 
        onLoadMore={mockOnLoadMore} 
        loading={false} 
        hasMore={true} 
      />
    );
    
    expect(screen.getByText('Scroll down to load more')).toBeInTheDocument();
  });

  it('renders nothing when hasMore is false', () => {
    const mockOnLoadMore = vi.fn();
    
    const { container } = render(
      <LoadMore 
        onLoadMore={mockOnLoadMore} 
        loading={false} 
        hasMore={false} 
      />
    );
    
    expect(container.firstChild).toBeNull();
  });

  it('has proper CSS classes', () => {
    const mockOnLoadMore = vi.fn();
    
    render(
      <LoadMore 
        onLoadMore={mockOnLoadMore} 
        loading={true} 
        hasMore={true} 
      />
    );
    
    const container = screen.getByText('Loading more users...').closest('div');
    expect(container).toHaveClass('loadMore');
  });
});
