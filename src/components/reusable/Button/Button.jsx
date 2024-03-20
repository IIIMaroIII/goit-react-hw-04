import React from 'react';
import PropTypes from 'prop-types';
import css from './button.module.css';

const Button = ({ children, type, onClick, ...restProps }) => {
  return (
    <button type={type} onClick={onClick} {...restProps}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  type: 'button',
  onClick: () => {},
};
Button.propTypes = {};

export default Button;
