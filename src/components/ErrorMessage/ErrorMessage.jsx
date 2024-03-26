import { useState, useEffect } from 'react';

import css from './errorMessage.module.css';
import Button from '../reusable/Button/Button';
import { IoMdClose } from 'react-icons/io';
import clsx from 'clsx';

const ErrorMessage = ({ close, children }) => {
  const closeModalByEsc = e => {
    if (e.code === 'Escape') {
      close();
    }
  };
  const closeModalByClick = e => {
    if (e.target === e.currentTarget) {
      close();
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', closeModalByEsc);
    return () => {
      window.removeEventListener('keydown', closeModalByEsc);
    };
  }, []);
  return (
    <div className={clsx(css.wrapper, css.wrapperLoad)}>
      <p className={css.text}>{children}</p>
      <Button className={css.btn} onClick={close}>
        <IoMdClose className={css.icon} />
      </Button>
    </div>
  );
};
ErrorMessage.defaultProps = { close: () => {} };
ErrorMessage.propTypes = {};

export default ErrorMessage;
