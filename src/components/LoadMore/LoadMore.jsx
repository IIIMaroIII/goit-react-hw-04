import React from 'react';
import css from './loadMore.module.css';
import Button from '../reusable/Button/Button';

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
