// src/components/SearchBar.js
import React from "react";
import "../styles/Toolbar.css"; // استایل مشترک

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
