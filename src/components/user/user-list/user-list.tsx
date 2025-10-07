import { useEffect, useState } from 'react';
import { UserWithRole } from '../../../types/user.types';
import { userService } from '../../../services/user.service';
import UserCard from '../user-card/user-card';
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
        const usersData = await userService.getUsers();
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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '3rem 0' }}>
        <div style={{ width: 32, height: 32, borderRadius: '9999px', border: '2px solid #111827', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }} />
        <span style={{ marginLeft: 8, color: '#4b5563' }}>Loading users...</span>
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
