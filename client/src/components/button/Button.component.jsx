import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ type = 'button', text = 'Button text', onClick }) => {
  return (
    <button type={type} onClick={onClick}>
      {text}
    </button>
  );
};
Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
};
export default Button;
