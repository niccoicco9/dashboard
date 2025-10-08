import { useState } from 'react';
import { Search } from 'lucide-react';
import styles from './search-bar.module.scss';
import { SEARCH_PLACEHOLDER } from '../../../consts/text.const';

interface SearchBarProps {
  onSearch: (query: string) => void;
  value?: string;
}

function SearchBar({ onSearch, value = '' }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState<string>(value);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const clearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchIcon}>
        <Search size={16} />
      </div>
      <input
        id="search-input"
        name="search"
        type="text"
        placeholder={SEARCH_PLACEHOLDER}
        value={searchQuery}
        onChange={handleSearchChange}
        className={styles.searchInput}
        autoComplete="off"
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
  );
}

export default SearchBar;
