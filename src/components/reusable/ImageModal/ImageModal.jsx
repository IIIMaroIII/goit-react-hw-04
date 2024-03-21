import React from 'react';
import { createPortal } from 'react-dom';
import { IoMdClose } from 'react-icons/io';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import css from './imageModal.module.css';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

const ImageModal = ({ children, closeModal }) => {
  const closeModalByEsc = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };
  const closeModalByClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', closeModalByEsc);
    return () => {
      window.removeEventListener('keydown', closeModalByEsc);
    };
  }, []);

  return createPortal(
    <div onClick={closeModalByClick} className={css.backdrop}>
      <div className={css.content}>
        {children}
        <Button className={css.btn} onClick={closeModal}>
          <IoMdClose className={css.icon} />
        </Button>
      </div>
    </div>,
    modalRoot,
  );
};

ImageModal.propTypes = {};

export default ImageModal;
