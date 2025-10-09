import {} from 'react';
import styles from './toolbar.module.scss';
import { TOOLBAR_TITLE, SEARCH_PLACEHOLDER, ALL_ROLES_OPTION, ADMIN_ROLE_OPTION, MODERATOR_ROLE_OPTION, USER_ROLE_OPTION } from '@/consts/text.const';
import SearchBar from '@/components/input/search-bar/search-bar';
import Select from '@/components/input/select/select';
import { useScrolled } from '@/hooks/useScrolled/useScrolled';

interface ToolbarProps {
  onRoleFilter: (role: string) => void;
  onSearch: (query: string) => void;
  userCount?: number;
  totalCount?: number;
}

function Toolbar({ onRoleFilter, onSearch, userCount, totalCount }: ToolbarProps) {
  const isScrolled = useScrolled(10);
  const roleOptions = [
    { value: 'all', label: ALL_ROLES_OPTION },
    { value: 'admin', label: ADMIN_ROLE_OPTION },
    { value: 'moderator', label: MODERATOR_ROLE_OPTION },
    { value: 'user', label: USER_ROLE_OPTION },
  ];

  return (
    <div className={`${styles.toolbar} ${isScrolled ? styles.scrolled : ''}`} role="region" aria-label="Users toolbar">
      <div className={styles.toolbarInner}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            {TOOLBAR_TITLE}
            {userCount !== undefined && (
              <span className={styles.count}>
                {userCount}{totalCount !== undefined && userCount !== totalCount ? ` of ${totalCount}` : ''}
              </span>
            )}
          </h1>
        </div>

        <div className={styles.controls}>
          <SearchBar onSearch={onSearch} placeholder={SEARCH_PLACEHOLDER} />
          <Select onRoleFilter={onRoleFilter} options={roleOptions} value="all" />
        </div>
      </div>
    </div>
  );
}

export default Toolbar;
