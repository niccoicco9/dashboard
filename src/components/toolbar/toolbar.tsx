import {} from 'react';
import styles from './toolbar.module.scss';
import { TOOLBAR_TITLE } from '@/consts/text.const';
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
          <SearchBar onSearch={onSearch} />
          <Select onRoleFilter={onRoleFilter} />
        </div>
      </div>
    </div>
  );
}

export default Toolbar;
