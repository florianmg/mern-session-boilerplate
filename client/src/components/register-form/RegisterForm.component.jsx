import React, { useState } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import { API_URI } from '../../constants';
import Button from '../button';
import Input from '../input';
import { Form, Formik } from 'formik';

const RegisterForm = () => {
  const [redirect, setRedirect] = useState(false);

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    firstName: Yup.string(),
    lastName: Yup.string(),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email required'),
    password: Yup.string().required('Password is required'),
  });

  const onSubmit = (values) => {
    axios
      .post(`${API_URI}/auth/register`, values)
      .then((response) => {
        if (response.status === 201) setRedirect(true);
      })
      .catch((err) => console.log(err.response));
  };

  if (redirect) return <Redirect to="/login" />;
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <Input
          label="First name :"
          type="text"
          id="firstName"
          name="firstName"
        />
        <Input label="Last name :" type="text" id="lastName" name="lastName" />
        <Input label="Email :" type="text" id="email" name="email" />
        <Input
          label="Password :"
          type="password"
          id="password"
          name="password"
        />
        <Button type="submit" text="Register" />
      </Form>
    </Formik>
  );
};

export default RegisterForm;
