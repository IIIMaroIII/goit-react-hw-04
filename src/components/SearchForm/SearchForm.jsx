import React from 'react';
import SearchAPI from '../services/searchAPI';
import css from './searchForm.module.css';
import PropTypes from 'prop-types';

const SearchForm = ({ onSearch }) => {
  const API = new SearchAPI();

  const onSubmit = e => {
    e.preventDefault();
    const inputValue = e.target.elements.search.value;
    API.getImages(inputValue)
      .then(res => console.log(res.results))
      .catch();
  };
  return (
    <nav className={css.wrapper}>
      <form onSubmit={onSubmit}>
        <input className={css.input} type="text" name="search" />
        <button type="submit">Send</button>
      </form>
    </nav>
  );
};

SearchForm.propTypes = {};

export default SearchForm;
