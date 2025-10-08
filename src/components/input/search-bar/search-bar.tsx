import { useState } from 'react';
import { Search, X } from 'lucide-react';
import styles from './search-bar.module.scss';
import { SEARCH_PLACEHOLDER } from '@/consts/text.const';

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
        className={`${styles.searchInput} ${searchQuery ? styles.searchActive : ''}`}
        autoComplete="off"
      />
      {searchQuery && (
        <button onClick={clearSearch} className={styles.clearButton} aria-label="Clear search">
          <X size={14} />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
