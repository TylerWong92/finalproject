import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Registration = () => {
  const initialValues = {
    username: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then(() => {
      console.log(data);
    });
  };

  return (
    <div>
      Registration Page
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <legend>Username:</legend>
          <ErrorMessage name="username" component="span" />
          <Field name="username" placeholder="(Ex.john)" />
          <legend>Password:</legend>
          <ErrorMessage name="password" component="span" />
          <Field type="password" name="password" placeholder="(Ex.1234)" />
          <button type="submit">Register Now!</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Registration;
