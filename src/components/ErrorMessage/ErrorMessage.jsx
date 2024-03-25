import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './errorMessage.module.css';
import clsx from 'clsx';

const ErrorMessage = ({ status, children }) => {
  // const [loaded, setLoaded] = useState(false);
  // useEffect(() => {
  //   setLoaded(true);
  // }, [onError]);

  return (
    <div
      className={status === 'rejected' && clsx(css.wrapper, css.wrapperLoad)}
    >
      <p className={css.text}>{children}</p>
    </div>
  );
};
ErrorMessage.defaultProps = {};
ErrorMessage.propTypes = {};

export default ErrorMessage;
