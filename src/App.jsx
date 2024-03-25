import { useState, useEffect, useRef } from 'react';
import Loader from './components/Loader/Loader';
import LoadMore from './components/LoadMore/LoadMore';
import ImageModal from './components/reusable/ImageModal/ImageModal';
import ImageCard from './components/ImageGallery/ImageCard/ImageCard';
import API from './components/services/API';
import SearchFrom from './components/SearchForm/SearchForm';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import './App.css';

const initialStatus = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

function App() {
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(initialStatus.IDLE);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState({});
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(null);
  const [isLoadMoreActive, setLoadMore] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isTheFirstRender = useRef(true);

  function toggleLoadMoreAndLoader() {
    if (isLoadMoreActive || !isLoading) {
      return (
        <LoadMore
          error={error}
          status={status}
          onLoadMore={() => {
            setPage(prev => prev + 11);
          }}
        />
      );
    }
    return <Loader />;
  }

  const onHandleSearchSubmit = value => {
    setShowModal(false);
    setStatus(initialStatus.PENDING);
    setError(null);
    setResults([]);
    setQuery(value);
    setPage(1);
    setIsLoading(true);
    if (value.trim() === '') {
      setIsLoading(false);
      setStatus(initialStatus.REJECTED);
      return setError({ message: 'Type smth in!' });
    }
    const data = API(value, page, setError);
    data
      .then(res => {
        if (res.results.length === 0) {
          setStatus(initialStatus.REJECTED);
          setError({ message: 'We`ve found nothing according your request' });
          return;
        }
        if (page >= res.total_pages) {
          setStatus(initialStatus.REJECTED);
          setError({ message: 'You`ve reached the end of this collection' });
          return;
        }
        setStatus(initialStatus.RESOLVED);
        setResults(res.results);
        setIsLoading(false);
      })
      .catch(err => {
        setStatus(initialStatus.REJECTED);
        setError({ message: error.message });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    console.log(status);
  }, [status]);

  useEffect(() => {
    if (page <= 1) {
      return;
    }
    setError(null);
    setIsLoading(true);
    setLoadMore(false);
    const data = API(query, page, setError);
    data
      .then(res => {
        if (page >= res.total_pages) {
          setStatus(initialStatus.REJECTED);
          console.log('page', page);
          console.log('res.total_pages', res.total_pages);
          setError({ message: 'You`ve reached the end of this collection' });
          return;
        }
        setStatus(initialStatus.RESOLVED);
        console.log(res);
        setResults(p => [...p, ...res.results]);
        setIsLoading(false);
      })
      .catch(err => {
        setStatus(initialStatus.REJECTED);
        setError({ message: error.message });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page]);

  // useEffect(() => {
  //   if (isTheFirstRender.current) {
  //     isTheFirstRender.current = false;
  //     return;
  //   }

  //   setError(null);
  //   setResults([]);
  //   setPage(1);

  //   async function fetch() {
  //     try {
  //       const data = await API(query, page, setError);
  //       console.log(data);
  //     } catch (error) {
  //       setError({ message: error.message });
  //     }
  //   }

  //   fetch();
  // }, [page, query]);

  // useEffect(() => {
  //   if (isTheFirstRender.current) {
  //     isTheFirstRender.current = true;
  //     return;
  //   }
  //   setResults([]);
  //   setError(null);
  //   if (query.trim() === '') {
  //     setError({ message: 'Type in your request' });
  //     return;
  //   }

  //   async function fetch() {
  //     try {
  //       setIsLoading(true);
  //       const { total, total_pages, results } = await API.getImages(query, 1);
  //       if (results.length === 0) {
  //         setResults([]);
  //         setError({ message: 'I`m sorry we have not found any images' });
  //       }
  //       setResults(results);
  //       setLoadMore(true);
  //       setError(null);
  //       setIsLoading(false);
  //       setPage(1);
  //     } catch (error) {
  //       setError({ message: error.message });
  //     }
  //   }
  //   fetch();
  // }, [query]);

  // useEffect(() => {
  //   if (page <= 1) {
  //     return;
  //   }
  //   setError(null);
  //   setIsLoading(true);
  //   setLoadMore(false);
  //   async function fetchData() {
  //     try {
  //       const { results } = await API.getImages(query, page);
  //       setResults(prev => [...prev, ...results]);
  //       setIsLoading(false);
  //       setLoadMore(true);
  //     } catch (error) {
  //       setError({ message: error.message });
  //     }
  //   }
  //   fetchData();
  // }, [page]);

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
        {status === 'rejected' && (
          <ErrorMessage status={status}>{error.message}</ErrorMessage>
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

      {showModal && (
        <ImageModal closeModal={() => setShowModal(!showModal)}>
          <ImageCard {...selectedImage} />
        </ImageModal>
      )}
    </>
  );
}
export default App;
