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
  const hasUserScrolledRef = useRef<boolean>(false);
  const canLoadMore = () => hasMore && !loading && !isLoadingMore;

  useEffect(() => {
    if (showButton) return;
    if (disableObserver) return;

    const docEl = document.documentElement;
    const canScroll = docEl.scrollHeight > (window.innerHeight || docEl.clientHeight);
    if (!canScroll) return;

    const onFirstScroll = () => {
      hasUserScrolledRef.current = true;
      const el = triggerRef.current;
      const viewportH = window.innerHeight || docEl.clientHeight;
      if (el && el.getBoundingClientRect().top <= viewportH && canLoadMore()) {
        onLoadMore();
      }
      window.removeEventListener('scroll', onFirstScroll);
    };
    window.addEventListener('scroll', onFirstScroll, { passive: true });

    const maybeTriggerOnScrollBottom = () => {
      if (!hasUserScrolledRef.current) return;
      const scrollY = window.pageYOffset || docEl.scrollTop || 0;
      const viewportH = window.innerHeight || docEl.clientHeight;
      const docH = docEl.scrollHeight;
      const distanceFromBottom = docH - (scrollY + viewportH);
      if (distanceFromBottom <= 200 && canLoadMore()) {
        onLoadMore();
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting && hasUserScrolledRef.current && canLoadMore()) {
          onLoadMore();
        }
      },
      {
        threshold: 0,
        // Trigger a bit earlier as the user approaches the bottom
        rootMargin: '0px 0px 200px 0px'
      }
    );

    const currentRef = triggerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    window.addEventListener('scroll', maybeTriggerOnScrollBottom, { passive: true });

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
      window.removeEventListener('scroll', onFirstScroll);
      window.removeEventListener('scroll', maybeTriggerOnScrollBottom);
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
        <button
          type="button"
          className={styles.trigger}
          onClick={() => {
            hasUserScrolledRef.current = true;
            onLoadMore();
          }}
          data-testid="load-more-button"
        >
          Load more users
        </button>
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
