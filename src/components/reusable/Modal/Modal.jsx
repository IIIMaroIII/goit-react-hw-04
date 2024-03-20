import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import css from './modal.module.css';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ children, closeModal }) => {
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
        <Button onClick={closeModal}>Close Modal</Button>
      </div>
    </div>,
    modalRoot,
  );
};

Modal.propTypes = {};

export default Modal;
