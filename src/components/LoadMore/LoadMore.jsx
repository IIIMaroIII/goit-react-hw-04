import React from 'react';
import PropTypes from 'prop-types';
import css from './loadMore.module.css';
import Button from '../reusable/Button/Button';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import clsx from 'clsx';

const LoadMore = ({ error, onLoadMore }) => {
  return (
    <div className={css.wrapper}>
      {!error ? (
        <Button className={css.btn} onClick={onLoadMore}>
          Load more
        </Button>
      ) : (
        <Button className={css.loadMore} onClick={onLoadMore} disabled={true}>
          {error.message}
        </Button>
      )}
    </div>
  );
};

LoadMore.propTypes = {};

export default LoadMore;
