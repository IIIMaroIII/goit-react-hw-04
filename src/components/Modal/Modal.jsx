import React from 'react';
import PropTypes from 'prop-types';
import css from './modal.module.css';
import clsx from 'clsx';

const Modal = ({ children }) => {
  return (
    <div className={clsx(css.modal, children && css.isOpen)}>{children}</div>
  );
};

Modal.propTypes = {};

export default Modal;
