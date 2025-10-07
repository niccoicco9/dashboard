import styles from './toolbar.module.scss';
import { TOOLBAR_TITLE } from '../../consts/text.const';
import SearchBar from '../input/search-bar/search-bar';
import Select from '../input/select/select';

interface ToolbarProps {
  onRoleFilter: (role: string) => void;
  onSearch: (query: string) => void;
  userCount?: number;
  totalCount?: number;
}

function Toolbar({ onRoleFilter, onSearch, userCount, totalCount }: ToolbarProps) {

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
        <SearchBar onSearch={onSearch} />
        <Select onRoleFilter={onRoleFilter} />
      </div>
    </div>
  );
}

export default Toolbar;
