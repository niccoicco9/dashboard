import { useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import styles from '@/components/user/load-more/load-more.module.scss';

interface LoadMoreProps {
  onLoadMore: () => void;
  loading: boolean;
  hasMore: boolean;
  isLoadingMore?: boolean;
  showButton?: boolean;
  disableObserver?: boolean;
}

function LoadMore({ onLoadMore, loading, hasMore, isLoadingMore = false, showButton = false, disableObserver = false }: LoadMoreProps) {
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showButton) return;
    if (disableObserver) return;

    const docEl = document.documentElement;
    const canScroll = docEl.scrollHeight > (window.innerHeight || docEl.clientHeight);
    if (!canScroll) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting && hasMore && !loading && !isLoadingMore) {
          onLoadMore();
        }
      },
      {
        threshold: 0,
        rootMargin: '0px'
      }
    );

    const currentRef = triggerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [onLoadMore, hasMore, loading, isLoadingMore, showButton, disableObserver]);

  if (!hasMore) {
    return null;
  }

  return (
    <div ref={triggerRef} className={styles.loadMore} data-testid="load-more">
      {isLoadingMore ? (
        <div className={styles.loading} data-testid="load-more-loading">
          <Loader2 size={24} className={styles.spinner} />
          <span>Loading more users...</span>
        </div>
      ) : showButton ? (
        showButton ? (
          <button
            type="button"
            className={styles.trigger}
            onClick={() => onLoadMore()}
            data-testid="load-more-button"
          >
            Load more users
          </button>
        ) : null
      ) : (
        <div 
          className={styles.trigger}
          data-testid="load-more-trigger"
          onClick={() => {
            onLoadMore();
          }}
        >
          Click here or scroll down to load more
        </div>
      )}
    </div>
  );
}

export default LoadMore;
