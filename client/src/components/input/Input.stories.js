import React from 'react';
import {Formik, Form} from 'formik';
import Input from './';

export default {
  title: 'Input',
  components: Input
};

export const InputExemple = () => {
  return (
    <Formik initialValues={{username: "", password: "" }} onSubmit={() => console.log("submit form")} >
      <Form>
        <Input type="text" name="username" label="username"/>
        <Input type="password" name="password" label="password"/>
      </Form>
    </Formik>
  )
}