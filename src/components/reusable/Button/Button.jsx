import PropTypes from 'prop-types';

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
      className={className}
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
