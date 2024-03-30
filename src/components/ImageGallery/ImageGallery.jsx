import React from 'react';

import css from './imageGallery.module.css';
import ImageCard from './ImageCard/ImageCard';

const ImageGallery = ({ setImage, data, onModalOpen }) => {
  return (
    <ul className={css.gallery}>
      {data.map(({ id, alt, description, urls, likes, ...restArgs }) => {
        return (
          <li
            // onClick={() => {
            //   onModalOpen(true);
            // }}
            key={id}
            className={css.item}
          >
            <ImageCard
              onModalOpen={onModalOpen}
              setImage={setImage}
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
