import { useState, useEffect } from 'react';
import Button from '../reusable/Button/Button';
import { IoSearchOutline } from 'react-icons/io5';
import css from './searchBar.module.css';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const SearchBar = ({ isSubmitting, onSearch }) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    const inputValue = e.target.elements.search.value.trim().toLowerCase();
    onSearch(inputValue);
  };
  return (
    <>
      <nav className={clsx(css.wrapper, loaded && css.wrapperLoad)}>
        <form className={css.form} onSubmit={onSubmit}>
          <input className={css.input} type="text" name="search" />
          <Button className={css.btn} type="submit" disabled={isSubmitting}>
            <IoSearchOutline className={css.icon} />
          </Button>
        </form>
      </nav>
    </>
  );
};

SearchBar.propTypes = {};

export default SearchBar;
