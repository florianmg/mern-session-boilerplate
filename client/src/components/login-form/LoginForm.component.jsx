import React, { useContext } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import AuthApi from '../../utils/AuthApi';

import { API_URI } from '../../constants';
import Button from '../button';
import Input from '../input';
import { Form, Formik } from 'formik';

const LoginForm = () => {
  const ctx = useContext(AuthApi);
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const onSubmit = (values) => {
    axios
      .post(`${API_URI}/auth/login`, values, { withCredentials: true })
      .then((response) => {
        ctx.setAuth(true);
      })
      .catch((err) => console.log('error => ', err.response.data.message));
  };
  return (
    <>
      {ctx.auth ? (
        <Redirect to="/dashboard" />
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <Input label="Email" type="text" id="email" name="email" />
            <Input
              label="Password"
              type="password"
              id="password"
              name="password"
            />
            <Button type="submit" text="Login" />
          </Form>
        </Formik>
      )}
    </>
  );
};

export default LoginForm;
