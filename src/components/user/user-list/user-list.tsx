import { useEffect, useState, useMemo } from 'react';
import { UserWithRole } from '../../../types/user.types';
import { userService } from '../../../services/user.service';
import UserCard from '../user-card/user-card';
import UserCardSkeleton from '../user-card-skeleton/user-card-skeleton';
import UserSidePanel from '../user-sidepanel/user-sidepanel';
import Toolbar from '../../toolbar/toolbar';
import styles from './user-list.module.scss';

function UserList() {
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserWithRole | null>(null);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [usersData] = await Promise.all([
          userService.getUsers(),
          new Promise(resolve => setTimeout(resolve, 1000))
        ]);
        
        setUsers(usersData);
      } catch (err) {
        setError('Failed to load users');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

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
    return users.filter(user => {
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      const matchesSearch = searchQuery === '' || 
        user.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesRole && matchesSearch;
    });
  }, [users, roleFilter, searchQuery]);

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
      <div style={{ textAlign: 'center', padding: '3rem 0' }}>
        <div style={{ color: '#dc2626', marginBottom: '0.5rem' }}>⚠️ {error}</div>
        <button onClick={() => window.location.reload()} style={{ color: '#2563eb', textDecoration: 'underline' }}>Try again</button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Toolbar 
        onRoleFilter={handleRoleFilter} 
        onSearch={handleSearch}
        userCount={filteredUsers.length}
        totalCount={users.length}
      />
      
      <div className={styles.list}>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} onClick={() => handleUserClick(user)} />
          ))
        ) : (
          <div className={styles.noResults}>
            <div className={styles.noResultsIcon}>🔍</div>
            <h3 className={styles.noResultsTitle}>No users found</h3>
            <p className={styles.noResultsText}>
              Try adjusting your search criteria or filters
            </p>
          </div>
        )}
      </div>
      
      <UserSidePanel
        user={selectedUser}
        isOpen={isSidePanelOpen}
        onClose={handleCloseSidePanel}
      />
    </div>
  );
}

export default UserList;
