import css from './imageGallery.module.css';
import ImageCard from './ImageCard/ImageCard';

const ImageGallery = ({ setImage, data, toggleModal }) => {
  return (
    <ul className={css.gallery}>
      {data.map(({ id, alt, description, urls, likes, ...restArgs }) => {
        return (
          <li
            onClick={() => {
              toggleModal();
              setImage({ id, alt, description, urls, likes });
            }}
            key={id}
            className={css.item}
          >
            <ImageCard
              onModalOpen={toggleModal}
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
