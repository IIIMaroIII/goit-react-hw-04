import React from 'react';
import PropTypes from 'prop-types';
import css from './imageCard.module.css';

const ImageCard = ({ alt, description, urls, likes, ...allArgs }) => {
  return (
    <div className={css.wrapper}>
      <img className={css.image} src={urls.small} alt={alt} />
    </div>
  );
};

ImageCard.propTypes = {};

export default ImageCard;
