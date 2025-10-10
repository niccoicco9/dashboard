import Toolbar from '@/components/toolbar/toolbar';
import { TOOLBAR_FILTER_TITLE, SEARCH_PLACEHOLDER, USERS_COUNT_LABEL } from '@/consts/text.const';
import { ROLE_OPTIONS } from '@/consts/filters.const';
import SearchBar from '@/components/input/search-bar/search-bar';
import Select from '@/components/input/select/select';
import styles from '@/components/user/user-toolbar/user-toolbar.module.scss';

interface UserToolbarProps {
  onRoleFilter: (role: string) => void;
  onSearch: (query: string) => void;
  userCount?: number;
}

export default function UserToolbar({ onRoleFilter, onSearch, userCount }: UserToolbarProps) {
  return (
    <Toolbar title={TOOLBAR_FILTER_TITLE} ariaLabel="Users toolbar">
        {userCount !== undefined ? <span className={styles.count} aria-live="polite">{USERS_COUNT_LABEL} {userCount}</span> : null}
        <SearchBar onSearch={onSearch} placeholder={SEARCH_PLACEHOLDER} />
        <Select onRoleFilter={onRoleFilter} options={ROLE_OPTIONS} value="all" />
    </Toolbar>
  );
}


