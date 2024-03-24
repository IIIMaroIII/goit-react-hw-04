import { useState, useEffect } from 'react';
import Loader from './components/Loader/Loader';
import LoadMore from './components/LoadMore/LoadMore';
import ImageModal from './components/reusable/ImageModal/ImageModal';
import ImageCard from './components/ImageGallery/ImageCard/ImageCard';
import SearchAPI from './components/services/searchAPI';
import SearchFrom from './components/SearchForm/SearchForm';
import ImageGallery from './components/ImageGallery/ImageGallery';
import './App.css';
import clsx from 'clsx';
import Button from './components/reusable/Button/Button';

function App() {
  const API = new SearchAPI();

  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState({});
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoadMoreActive, setLoadMore] = useState(false);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function toggleLoadMoreAndLoader() {
    if (isLoadMoreActive || !isLoading) {
      return (
        <LoadMore
          onLoadMore={() => {
            setPage(prev => prev + 1);
          }}
        />
      );
    }
    return <Loader />;
  }

  useEffect(() => {
    if (query === '') {
      return;
    }
    async function fetch() {
      setError(false);
      setResults([]);
      setIsLoading(true);
      try {
        const { total, total_pages, results } = await API.getImages(query, 1);

        setResults(results);
        setLoadMore(true);
        API.total = total;
        API.total_pages = total_pages;

        setLoadMore(true);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
        setPage(1);
      }
    }
    fetch();
  }, [query]);

  useEffect(() => {
    if (page > 1) {
      async function fetchData() {
        setIsLoading(true);
        setLoadMore(false);
        const { results } = await API.getImages(query, page);
        setResults(prev => [...prev, ...results]);
        setIsLoading(false);
        setLoadMore(true);
      }
      try {
        fetchData();
        // fetchData; // Define this func inside body of useEffect???
      } catch (error) {
        setError(true);
      }
    }
    // return () => {
    //   setIsLoading(true);
    //   setLoadMore(false);
    // };
  }, [page]);

  return (
    <>
      <div className="searchWrapper">
        <SearchFrom
          onError={setError}
          showModal={() => setShowModal(!showModal)}
          onSearch={setQuery}
        />
        {isLoading || results.length < 0 ? (
          <div className="loaderWrapper">
            <Loader />
          </div>
        ) : (
          ''
        )}
      </div>

      {results.length > 0 && (
        <div className="wrapper">
          <div className="galleryWrapper">
            <ImageGallery
              setImage={setSelectedImage}
              onModalOpen={() => setShowModal(!showModal)}
              data={results}
            />
            {toggleLoadMoreAndLoader()}
          </div>
        </div>
      )}
      {error && <p>There`s some mistake </p>}

      {showModal && (
        <ImageModal closeModal={() => setShowModal(!showModal)}>
          <ImageCard {...selectedImage} />
        </ImageModal>
      )}
    </>
  );
}
export default App;
// {
//   isLoadMoreActive && <LoadMore onLoadMore={handleLoadMore} />;
// }
// {
//   isLoading && <Loader />;
// }
