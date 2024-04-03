import { useEffect } from 'react';
import css from './imageCard.module.css';

const ImageCard = ({
  onModalOpen,
  setImage,
  alt,
  description,
  urls,
  likes,
  id,
}) => {
  return (
    <div className={css.wrapper}>
      <img
        loading="lazy"
        id={id}
        className={css.image}
        src={!onModalOpen ? `${urls.full}` : `${urls.small}`}
        alt={alt}
      />
    </div>
  );
};

ImageCard.propTypes = {};

export default ImageCard;
