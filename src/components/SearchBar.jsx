import "../styles/Toolbar.css";

const SearchBar = ({ query, setQuery }) => {
  return (
    <div className="toolbar">
      <input
        type="text"
        placeholder="جستجو بر اساس نام، نام خانوادگی یا ایمیل"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
