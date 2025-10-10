import {} from 'react';
import styles from '@/components/toolbar/toolbar.module.scss';
import { TOOLBAR_TITLE, SEARCH_PLACEHOLDER } from '@/consts/text.const';
import { ROLE_OPTIONS } from '@/consts/filters.const';
import SearchBar from '@/components/input/search-bar/search-bar';
import Select from '@/components/input/select/select';
import { useScrolled } from '@/hooks/useScrolled/useScrolled';

interface ToolbarProps {
  onRoleFilter: (role: string) => void;
  onSearch: (query: string) => void;
  userCount?: number;
}

function Toolbar({ onRoleFilter, onSearch, userCount }: ToolbarProps) {
  const isScrolled = useScrolled(10);
  const roleOptions = ROLE_OPTIONS;

  return (
    <div className={`${styles.toolbar} ${isScrolled ? styles.scrolled : ''}`} role="region" aria-label="Users toolbar">
      <div className={styles.toolbarInner}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            {TOOLBAR_TITLE}
            {userCount !== undefined && (
              <span className={styles.count}>
                {userCount}
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
