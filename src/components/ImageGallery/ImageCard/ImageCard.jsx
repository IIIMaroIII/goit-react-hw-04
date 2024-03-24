import React from 'react';
import PropTypes from 'prop-types';
import css from './imageCard.module.css';

const ImageCard = ({
  onModalOpen,
  alt,
  description,
  urls,
  likes,
  id,
  ...allArgs
}) => {
  return (
    <div className={css.wrapper}>
      <img
        loading="lazy"
        id={id}
        className={css.image}
        src={onModalOpen ? `${urls.regular}` : `${urls.small}`}
        alt={alt}
      />
      {onModalOpen && (
        <div className={css.infoWrapper}>
          <p>Likes: {likes}</p>
          <p>Description: {description}</p>
        </div>
      )}
    </div>
  );
};

ImageCard.propTypes = {};

export default ImageCard;
