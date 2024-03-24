import React from 'react';
import PropTypes from 'prop-types';
import css from './loadMore.module.css';
import Button from '../reusable/Button/Button';

const LoadMore = ({ onLoadMore }) => {
  return (
    <div className={css.wrapper}>
      <Button className={css.btn} onClick={onLoadMore}>
        Load more
      </Button>
    </div>
  );
};

LoadMore.propTypes = {};

export default LoadMore;
