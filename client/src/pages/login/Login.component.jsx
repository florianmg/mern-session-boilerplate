import React from 'react';
import LoginForm from '../../components/login-form';

import './Login.scss';

/** TODO
 * Validation Schema with yup ?
 */
const Login = () => {
  return (
    <div className="login-page">
      <p>Login : </p>
      <LoginForm />
    </div>
  );
};

export default Login;
