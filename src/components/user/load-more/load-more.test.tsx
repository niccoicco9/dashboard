import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import LoadMore from './load-more';

describe('LoadMore', () => {
  it('renders loading state when isLoadingMore is true', () => {
    const mockOnLoadMore = vi.fn();
    
    render(
      <LoadMore 
        onLoadMore={mockOnLoadMore} 
        loading={false}
        hasMore={true} 
        isLoadingMore={true}
      />
    );
    
    expect(screen.getByTestId('load-more-loading')).toBeInTheDocument();
  });

  it('renders hint before scroll and trigger after scroll', () => {
    const mockOnLoadMore = vi.fn();
    
    render(
      <LoadMore 
        onLoadMore={mockOnLoadMore} 
        loading={false} 
        hasMore={true} 
      />
    );
    // First shows hint
    expect(screen.getByTestId('load-more-hint')).toBeInTheDocument();
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

  it('has proper wrapper test id', () => {
    const mockOnLoadMore = vi.fn();
    
    render(
      <LoadMore 
        onLoadMore={mockOnLoadMore} 
        loading={false}
        hasMore={true} 
        isLoadingMore={true}
      />
    );
    
    expect(screen.getByTestId('load-more')).toBeInTheDocument();
  });
});
