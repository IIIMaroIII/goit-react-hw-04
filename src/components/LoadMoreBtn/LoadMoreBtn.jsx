import React from 'react';
import css from './loadMoreBtn.module.css';
import Button from '../reusable/Button/Button';

const LoadMoreBtn = ({ error, onLoadMore }) => {
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

LoadMoreBtn.propTypes = {};

export default LoadMoreBtn;
