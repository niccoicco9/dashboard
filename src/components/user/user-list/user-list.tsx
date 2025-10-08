import { useState, useMemo } from 'react';
import { UserWithRole } from '@/types/user.types';
import UserCard from '@/components/user/user-card/user-card';
import UserCardSkeleton from '@/components/user/user-card-skeleton/user-card-skeleton';
import UserSidePanel from '@/components/user/user-sidepanel/user-sidepanel';
import NoUsers from '@/components/user/no-users/no-users';
import LoadMore from '@/components/user/load-more/load-more';
import Toolbar from '@/components/toolbar/toolbar';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll/useInfiniteScroll';
import styles from './user-list.module.scss';

function UserList() {
  const [selectedUser, setSelectedUser] = useState<UserWithRole | null>(null);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

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

  if (loading) {
    return (
      <div className={styles.container}>
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
    <div className={styles.container}>
        <Toolbar 
          onRoleFilter={handleRoleFilter} 
          onSearch={handleSearch}
          userCount={filteredUsers.length}
          totalCount={total === -1 ? undefined : total}
        />
      
      <div className={styles.list}>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user: UserWithRole) => (
            <UserCard key={user.id} user={user} onClick={() => handleUserClick(user)} />
          ))
        ) : (
          <NoUsers />
        )}
      </div>
      
      <LoadMore 
        onLoadMore={loadMore}
        loading={loading}
        hasMore={hasMore && !shouldDisableInfiniteScroll}
        isLoadingMore={isLoadingMore}
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
