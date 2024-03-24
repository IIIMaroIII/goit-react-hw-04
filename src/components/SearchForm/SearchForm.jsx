import { useState, useEffect } from 'react';

import Button from '../reusable/Button/Button';
import { IoSearchOutline } from 'react-icons/io5';
import css from './searchForm.module.css';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const SearchForm = ({ onError, isSubmitting, onSearch, showModal }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    console.log('set loaded to true');
    setLoaded(true);
  }, []);
  const onSubmit = e => {
    e.preventDefault();
    const inputValue = e.target.elements.search.value;
    if (inputValue.trim() === '') {
      return onError(true);
    }
    onSearch(inputValue);
  };
  return (
    <nav className={clsx(css.wrapper, loaded && css.wrapperLoad)}>
      <form className={css.form} onSubmit={onSubmit}>
        <input className={css.input} type="text" name="search" />
        <Button className={css.btn} type="submit" disabled={isSubmitting}>
          <IoSearchOutline className={css.icon} />
        </Button>
      </form>
    </nav>
  );
};

SearchForm.propTypes = {};

export default SearchForm;
