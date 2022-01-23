import React, { useEffect, useRef } from "react";
import { useGlobalContext } from "../context";

const SearchForm = () => {
  const { setSearch } = useGlobalContext();
  const searchRef = useRef("");
  const searchCocktail = () => {
    setSearch(searchRef.current.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    searchRef.current.focus();
  }, []);
  return (
    <section className="section search">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">search your favorite cocktail</label>
          <input id="name" ref={searchRef} onChange={searchCocktail} />
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
