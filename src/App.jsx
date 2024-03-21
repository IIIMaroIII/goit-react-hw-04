import { useState, useEffect } from 'react';
import Loader from './components/Loader/Loader';
import LoadMore from './components/LoadMore/LoadMore';
import ImageModal from './components/reusable/ImageModal/ImageModal';
import SearchAPI from './components/services/searchAPI';
import SearchFrom from './components/SearchForm/SearchForm';
import ImageGallery from './components/ImageGallery/ImageGallery';
import './App.css';
import clsx from 'clsx';
import Button from './components/reusable/Button/Button';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [results, setResults] = useState([]);
  const [pagination, setPagination] = useState({});
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSearchSubmit = value => {
    return setSearch(value);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  /**
   * HTTP request after Search has changed
   */

  useEffect(() => {
    setResults([]);
    async function fetch() {
      try {
        setIsLoading(true);
        const API = new SearchAPI();
        const { total, total_pages, results } = await API.getImages(search);
        setResults(results);
        setPagination({ total, total_pages });
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetch();
  }, [search]);

  return (
    <>
      <SearchFrom
        isSubmitting={isLoading}
        showModal={toggleModal}
        onSearch={onSearchSubmit}
      />

      {results.length > 0 && (
        <div className="wrapper">
          <ImageGallery onModalOpen={toggleModal} data={results} />
          <LoadMore isSubmitting={isLoading} />
        </div>
      )}
      {isLoading && <Loader />}
      {showModal && <ImageModal closeModal={toggleModal}></ImageModal>}
    </>
  );
}

export default App;
