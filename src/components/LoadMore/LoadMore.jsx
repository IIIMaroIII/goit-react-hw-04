import React from 'react';
import PropTypes from 'prop-types';
import css from './loadMore.module.css';
import Button from '../reusable/Button/Button';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import clsx from 'clsx';

const LoadMore = ({ error, status, onLoadMore }) => {
  return (
    <div
      className={clsx(
        css.wrapper,
        status === 'rejected' && status === 'rejected' && css.theEnd,
      )}
    >
      {status === 'rejected' ? (
        <Button
          className={css.loadMore}
          onClick={onLoadMore}
          disabled={status === 'rejected' && true}
        >
          {error.message}
        </Button>
      ) : (
        <Button
          className={css.btn}
          onClick={onLoadMore}
          disabled={status === 'rejected' && true}
        >
          Load more
        </Button>
      )}
    </div>
  );
};

LoadMore.propTypes = {};

export default LoadMore;
