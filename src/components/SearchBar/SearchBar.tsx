// styles
import styles from './SearchBar.module.scss';

// icons
import { CloseBtn } from '../Icons/CloseBtn';
import { SearchBtn } from '../Icons/SearchBtn';

interface SearchBarProps {
  showSearch: boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({
  showSearch,
  setShowSearch,
  search,
  setSearch,
}: SearchBarProps) => {
  const handleShowSearch = () => {
    setSearch('');
    setShowSearch(false);
  };

  const handleOpenSearch = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setShowSearch(true);
    }
  };
  return (
    <div className={styles.searchBar}>
      <div className={styles.wrapper}>
        {showSearch ? (
          <div onClick={handleShowSearch}>
            <CloseBtn />
          </div>
        ) : (
          <div onClick={() => setShowSearch(true)}>
            <SearchBtn />
          </div>
        )}
        <input
          type="text"
          placeholder="Search"
          value={showSearch ? '' : search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => handleOpenSearch(e)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
