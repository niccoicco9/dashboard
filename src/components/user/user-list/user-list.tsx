import { useEffect, useState } from 'react';
import { UserWithRole } from '../../../types/user.types';
import { userService } from '../../../services/user.service';
import UserCard from '../user-card/user-card';
import UserCardSkeleton from '../user-card-skeleton/user-card-skeleton';
import UserSidePanel from '../user-sidepanel/user-sidepanel';
import styles from './user-list.module.scss';

function UserList() {
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserWithRole | null>(null);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

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

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <h1 className={styles.title}>Users</h1>
        </div>
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
      <div className={styles.headerRow}>
        <h1 className={styles.title}>Users ({users.length})</h1>
      </div>
      <div className={styles.list}>
        {users.map((user) => (
          <UserCard key={user.id} user={user} onClick={() => handleUserClick(user)} />
        ))}
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
