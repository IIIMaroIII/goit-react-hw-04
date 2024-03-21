import React from 'react';
import PropTypes from 'prop-types';
import css from './button.module.css';
import clsx from 'clsx';

const Button = ({
  className,
  children,
  type,
  onClick,
  disabled,
  ...restProps
}) => {
  return (
    <button
      className={clsx(css.btn, className)}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...restProps}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  type: 'button',
  onClick: () => {},
  disabled: false,
  // Fix className prop
  className: '',
};
Button.propTypes = {};

export default Button;
