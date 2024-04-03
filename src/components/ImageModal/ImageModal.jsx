import ReactModal from 'react-modal';
// import { createPortal } from 'react-dom';
import { IoMdClose } from 'react-icons/io';
import PropTypes from 'prop-types';
import Button from '../reusable/Button/Button';
import css from './imageModal.module.css';
import { useEffect } from 'react';

ReactModal.setAppElement('#modal-root');

const ImageModal = ({ children, showModal, toggleModal }) => {
  // const onHandleCloseModal = e => {
  //   if (e.code === 'Escape' && e.target === e.currentTarget) {
  //     toggleModal();
  //   }
  //   console.log(e);
  // };
  // const closeModalByClick = e => {
  //   if (e.target === e.currentTarget) {
  //     closeModal();
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener('keydown', closeModalByEsc);
  //   return () => {
  //     window.removeEventListener('keydown', closeModalByEsc);
  //   };
  // }, []);

  return (
    <ReactModal
      isOpen={showModal}
      parentSelector={() => {
        return document.getElementById('modal-root');
      }}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      overlayClassName={css.backdrop}
      onRequestClose={toggleModal}
      className={css.content}
    >
      <Button className={css.btn} onClick={() => toggleModal()}>
        <IoMdClose className={css.icon} />
      </Button>
      {children}
    </ReactModal>
  );
};

ImageModal.propTypes = {};

export default ImageModal;
