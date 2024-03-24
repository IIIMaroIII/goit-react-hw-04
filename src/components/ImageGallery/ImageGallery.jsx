import React from 'react';
import PropTypes from 'prop-types';
import css from './imageGallery.module.css';
import ImageCard from './ImageCard/ImageCard';
import ImageModal from '../reusable/ImageModal/ImageModal';

const ImageGallery = ({ setImage, data, onModalOpen }) => {
  return (
    <ul className={css.gallery}>
      {data.map(({ id, alt, description, urls, likes, ...restArgs }) => {
        return (
          <li
            onClick={() => {
              onModalOpen(true);
              setImage({ id, alt, description, urls, likes, onModalOpen });
            }}
            key={id}
            className={css.item}
          >
            <ImageCard
              id={id}
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
