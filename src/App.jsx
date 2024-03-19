import { useState, useEffect } from 'react';
import SearchFrom from './components/SearchForm/SearchForm';
import Modal from './components/Modal/Modal';
import './App.css';
import clsx from 'clsx';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);

  return (
    <>
      <div className={clsx('wrapper', isOpen && 'modalIsOpen')}>
        <SearchFrom />
        <Modal>{isOpen && <p>Hey</p>}</Modal>
      </div>
    </>
  );
}

export default App;
