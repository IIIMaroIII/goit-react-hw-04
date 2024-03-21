import React from 'react';
import PropTypes from 'prop-types';
import css from './imageGallery.module.css';
import ImageCard from './ImageCard/ImageCard';

const ImageGallery = ({ data, onModalOpen }) => {
  return (
    <ul className={css.gallery}>
      {data.map(({ id, alt, description, urls, likes, ...restArgs }) => {
        return (
          <li onClick={onModalOpen} key={id} className={css.item}>
            <ImageCard
              alt={alt}
              description={description}
              urls={urls}
              likes={likes}
              {...restArgs}
            />
          </li>
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {};

export default ImageGallery;
