import React from 'react';
import Button from '../reusable/Button/Button';
import { IoSearchOutline } from 'react-icons/io5';
import css from './searchForm.module.css';
import PropTypes from 'prop-types';

const SearchForm = ({ isSubmitting, onSearch, showModal }) => {
  const onSubmit = e => {
    e.preventDefault();
    const inputValue = e.target.elements.search.value;
    if (inputValue.trim() === '') {
      throw new Error('Type in your request');
    }
    onSearch(inputValue);
  };
  return (
    <nav className={css.wrapper}>
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
