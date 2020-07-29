import React from 'react';
import RegisterForm from '../../components/register-form';

import './Register.scss';

const Register = () => {
  return (
    <div className="register-page">
      <p>Register: </p>
      <RegisterForm />
    </div>
  );
};

export default Register;
