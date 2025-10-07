import { useState } from 'react';
import styles from './toolbar.module.scss';
import { 
  TOOLBAR_TITLE, 
  SEARCH_PLACEHOLDER, 
  ALL_ROLES_OPTION, 
  ADMIN_ROLE_OPTION, 
  MODERATOR_ROLE_OPTION, 
  USER_ROLE_OPTION 
} from '../../consts/text.const';

interface ToolbarProps {
  onRoleFilter: (role: string) => void;
  onSearch: (query: string) => void;
  userCount?: number;
  totalCount?: number;
}

function Toolbar({ onRoleFilter, onSearch, userCount, totalCount }: ToolbarProps) {
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const role = event.target.value;
    setSelectedRole(role);
    onRoleFilter(role);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const clearFilters = () => {
    setSelectedRole('all');
    setSearchQuery('');
    onRoleFilter('all');
    onSearch('');
  };

  const clearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  const clearRole = () => {
    setSelectedRole('all');
    onRoleFilter('all');
  };

  return (
    <div className={styles.toolbar}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          {TOOLBAR_TITLE}
          {userCount !== undefined && totalCount !== undefined && (
            <span className={styles.count}>
              {userCount}{userCount !== totalCount ? ` of ${totalCount}` : ''}
            </span>
          )}
        </h1>
      </div>

      <div className={styles.controls}>
        <div className={styles.searchContainer}>
          <div className={styles.searchIcon}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </div>
          <input
            id="search-input"
            name="search"
            type="text"
            placeholder={SEARCH_PLACEHOLDER}
            value={searchQuery}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
          {searchQuery && (
            <button onClick={clearSearch} className={styles.clearButton}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>

        <div className={styles.selectContainer}>
          <select
            id="role-select"
            name="role"
            value={selectedRole}
            onChange={handleRoleChange}
            className={`${styles.select} ${selectedRole !== 'all' ? styles.selectActive : ''}`}
          >
            <option value="all">{ALL_ROLES_OPTION}</option>
            <option value="admin">{ADMIN_ROLE_OPTION}</option>
            <option value="moderator">{MODERATOR_ROLE_OPTION}</option>
            <option value="user">{USER_ROLE_OPTION}</option>
          </select>
          
          {selectedRole === 'all' && (
            <div className={styles.selectIcon}>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 8 4 4 4-4"></path>
              </svg>
            </div>
          )}
          
          {selectedRole !== 'all' && (
            <button onClick={clearRole} className={styles.clearButton}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Toolbar;
