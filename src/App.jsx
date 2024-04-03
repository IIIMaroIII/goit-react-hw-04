import { useState, useEffect } from 'react';
import Loader from './components/Loader/Loader';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import API from './components/services/API';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageCard from './components/ImageGallery/ImageCard/ImageCard';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import './App.css';
import ImageModal from './components/ImageModal/ImageModal';

function App() {
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [query, setQuery] = useState('');

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onLoadMore = () => {
    setPage(p => p + 1);
  };

  function toggleLoadMoreAndLoader() {
    if (!isLoading) {
      return <LoadMoreBtn error={error} onLoadMore={onLoadMore} />;
    }
    return <Loader />;
  }

  const onHandleSearchSubmit = value => {
    if (value === '') {
      setError({ message: 'Type in your request' });
      return;
    }

    setQuery(value);
    setItems([]);
    setPage(1);
  };
  useEffect(() => {
    if (!selectedImage) return;
    console.log('My selected image', selectedImage);
  }, [selectedImage]);

  useEffect(() => {
    if (!query) return;
    setError(null);
    async function fetch() {
      try {
        setIsLoading(true);
        const { total_pages, results } = await API(query, page, setError);
        if (results.length === 0) {
          setError({ message: 'We`ve found nothing according your request' });
          return;
        }
        if (page === total_pages) {
          setError({ message: 'You`ve reached the end of collection' });
          return;
        }
        setItems(p => [...p, ...results]);
        setTotalPages(total_pages);
        // setIsLoading(false);
      } catch (error) {
        setError({ message: error.message });
        // setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }
    fetch();
  }, [page, query]);

  return (
    <>
      <div className="searchWrapper">
        <SearchBar
          onError={setError}
          showModal={() => setShowModal(!showModal)}
          onSearch={onHandleSearchSubmit}
        />
        {isLoading && (
          <div className="loaderWrapper">
            <Loader />
          </div>
        )}
        {!error ? null : (
          <ErrorMessage
            close={() => {
              setError(null);
            }}
          >
            {error.message}
          </ErrorMessage>
        )}
      </div>

      {items.length > 0 && (
        <div className="wrapper">
          <div className="galleryWrapper">
            <ImageGallery
              setImage={setSelectedImage}
              toggleModal={toggleModal}
              data={items}
            />
            {toggleLoadMoreAndLoader()}
          </div>
        </div>
      )}
      {showModal && (
        <ImageModal showModal={showModal} toggleModal={toggleModal}>
          <ImageCard {...selectedImage} />
        </ImageModal>
      )}
    </>
  );
}
export default App;
