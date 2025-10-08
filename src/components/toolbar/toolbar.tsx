import { useState, useEffect } from 'react';
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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`${styles.toolbar} ${isScrolled ? styles.scrolled : ''}`}>
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
