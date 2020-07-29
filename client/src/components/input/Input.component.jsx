import React from 'react';
import PropTypes from 'prop-types';
import { Field, ErrorMessage } from 'formik';

import './Input.scss';

const ErrorText = ({ children }) => {
  return <span className="error">{children}</span>;
};

const Input = ({ label, as, type = 'text', name, placeholder }) => {
  return (
    <div className="input">
      {label && <label htmlFor={name}>{label}</label>}
      <Field
        as={as}
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
      />
      <ErrorMessage name={name} component={ErrorText} />
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  as: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
};

export default Input;
