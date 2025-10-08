import { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import styles from './load-more.module.scss';

interface LoadMoreProps {
  onLoadMore: () => void;
  loading: boolean;
  hasMore: boolean;
  isLoadingMore?: boolean;
}

function LoadMore({ onLoadMore, loading, hasMore, isLoadingMore = false }: LoadMoreProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setHasScrolled(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!hasScrolled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting && hasMore && !loading && !isLoadingMore) {
          onLoadMore();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
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
  }, [onLoadMore, hasMore, loading, isLoadingMore, hasScrolled]);

  if (!hasMore) {
    return null;
  }

  return (
    <div ref={triggerRef} className={styles.loadMore}>
      {isLoadingMore ? (
        <div className={styles.loading}>
          <Loader2 size={24} className={styles.spinner} />
          <span>Loading more users...</span>
        </div>
      ) : !hasScrolled ? (
        <div className={styles.scrollHint}>
          Scroll down to load more users
        </div>
      ) : (
        <div 
          className={styles.trigger}
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
