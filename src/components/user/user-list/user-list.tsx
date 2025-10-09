import { useState, useMemo, useRef, useEffect } from 'react';
import { UserWithRole } from '@/types/user.types';
import UserCardSkeleton from '@/components/user/user-card-skeleton/user-card-skeleton';
import UserSidePanel from '@/components/user/user-sidepanel/user-sidepanel';
import UserListGrid from '@/components/user/user-list/grid/UserListGrid';
import LoadMore from '@/components/user/load-more/load-more';
import Toolbar from '@/components/toolbar/toolbar';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll/useInfiniteScroll';
import styles from './user-list.module.scss';

function UserList() {
  const [selectedUser, setSelectedUser] = useState<UserWithRole | null>(null);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);
  const [showManualLoad, setShowManualLoad] = useState(false);
  const [hasMeasured, setHasMeasured] = useState(false);
  

  const { users, loading, error, hasMore, loadMore, total, isLoadingMore } = useInfiniteScroll();

  const handleUserClick = (user: UserWithRole) => {
    setSelectedUser(user);
    setIsSidePanelOpen(true);
  };

  const handleCloseSidePanel = () => {
    setIsSidePanelOpen(false);
    setSelectedUser(null);
  };

  const handleRoleFilter = (role: string) => {
    setRoleFilter(role);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user: UserWithRole) => {
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      const matchesSearch = searchQuery === '' || 
        user.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesRole && matchesSearch;
    });
  }, [users, roleFilter, searchQuery]);

  const shouldDisableInfiniteScroll = useMemo(() => {
    const hasActiveFilters = roleFilter !== 'all' || searchQuery !== '';
    const hasFewResults = filteredUsers.length < 12;
    return hasActiveFilters || hasFewResults;
  }, [roleFilter, searchQuery, filteredUsers.length]);

  // Measure container height to decide whether to show the manual button
  useEffect(() => {
    const measure = () => {
      const el = containerRef.current || document.documentElement;
      const viewportH = window.innerHeight || document.documentElement.clientHeight;
      const contentH = el.scrollHeight;
      const tooShort = contentH <= viewportH;
      setShowManualLoad(!shouldDisableInfiniteScroll && hasMore && tooShort);
    };

    measure();
    setHasMeasured(true);
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [users.length, shouldDisableInfiniteScroll, hasMore]);


  if (loading) {
    return (
      <div className={styles.container} ref={containerRef}>
        <Toolbar onRoleFilter={handleRoleFilter} onSearch={handleSearch} />
        <div className={styles.list}>
          {Array.from({ length: 6 }).map((_, index) => (
            <UserCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        {}
      </div>
    );
  }


  return (
    <div className={styles.container} ref={containerRef}>
        <Toolbar 
          onRoleFilter={handleRoleFilter} 
          onSearch={handleSearch}
          userCount={filteredUsers.length}
          totalCount={total}
        />
      
      <UserListGrid users={filteredUsers} onUserClick={handleUserClick} />
      
      <LoadMore 
        onLoadMore={loadMore}
        loading={loading}
        hasMore={hasMore && !shouldDisableInfiniteScroll}
        isLoadingMore={isLoadingMore}
        showButton={showManualLoad}
        disableObserver={!hasMeasured || showManualLoad}
      />
      
      <UserSidePanel
        user={selectedUser}
        isOpen={isSidePanelOpen}
        onClose={handleCloseSidePanel}
      />
    </div>
  );
}

export default UserList;
