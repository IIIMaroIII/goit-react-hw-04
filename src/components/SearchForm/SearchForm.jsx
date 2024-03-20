import React from 'react';
import Button from '../reusable/Button/Button';
import css from './searchForm.module.css';
import PropTypes from 'prop-types';

const SearchForm = ({ onSearch, showModal }) => {
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
      <form onSubmit={onSubmit}>
        <input className={css.input} type="text" name="search" />
        <Button type="submit">Send</Button>
        <Button onClick={showModal}>Show modal</Button>
      </form>
    </nav>
  );
};

SearchForm.propTypes = {};

export default SearchForm;
