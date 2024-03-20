import { useState, useEffect } from 'react';
import Modal from './components/reusable/Modal/Modal';
import SearchAPI from './components/services/searchAPI';
import SearchFrom from './components/SearchForm/SearchForm';
import './App.css';
import clsx from 'clsx';

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
      <SearchFrom showModal={toggleModal} onSearch={onSearchSubmit} />
      {isLoading && <p>Content is loading at this moment</p>}
      {showModal && (
        <Modal closeModal={toggleModal}>{showModal && <p>Hey</p>}</Modal>
      )}
    </>
  );
}

export default App;
