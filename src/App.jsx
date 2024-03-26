import { useState, useEffect } from 'react';
import Loader from './components/Loader/Loader';
import LoadMore from './components/LoadMore/LoadMore';
import ImageModal from './components/reusable/ImageModal/ImageModal';
import ImageCard from './components/ImageGallery/ImageCard/ImageCard';
import API from './components/services/API';
import SearchFrom from './components/SearchForm/SearchForm';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import './App.css';

function App() {
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedImage, setSelectedImage] = useState({});
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [query, setQuery] = useState('');

  const onLoadMore = () => {
    setPage(p => p + 1);
  };

  function toggleLoadMoreAndLoader() {
    if (!isLoading) {
      return <LoadMore error={error} onLoadMore={onLoadMore} />;
    }
    return <Loader />;
  }

  const onHandleSearchSubmit = value => {
    if (value === '') {
      setError({ message: 'Type in your request' });
      return;
    }
    setIsLoading(true);
    setQuery(value);
    setShowModal(false);
    setError(null);
    setItems([]);
    setPage(1);
  };

  useEffect(() => {
    if (!query) return;
    setIsLoading(false);
    setError(null);
    async function fetch() {
      try {
        setIsLoading(true);
        const { total_pages, results } = await API(query, page, setError);
        if (results.length === 0) {
          setIsLoading(true);
          setError({ message: 'We`ve found nothing according your request' });
          setIsLoading(false);
          return;
        }
        if (page === total_pages) {
          setIsLoading(true);
          setError({ message: 'You`ve reached the end of collection' });
          setIsLoading(false);
          return;
        }

        setIsLoading(true);
        setItems(p => [...p, ...results]);
        setTotalPages(total_pages);
        console.log(total_pages);
        setIsLoading(false);
      } catch (error) {
        setError({ message: error.message });
      }
    }
    fetch();
  }, [page, query]);

  return (
    <>
      <div className="searchWrapper">
        <SearchFrom
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
              onModalOpen={() => setShowModal(!showModal)}
              data={items}
            />
            {toggleLoadMoreAndLoader()}
          </div>
        </div>
      )}

      {showModal && (
        <ImageModal closeModal={() => setShowModal(!showModal)}>
          <ImageCard {...selectedImage} />
        </ImageModal>
      )}
    </>
  );
}
export default App;
