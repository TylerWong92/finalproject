import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const CreatePost = () => {
  const initialValues = {
    title: "",
    postText: "",
    username: "",
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    postText: Yup.string().required(),
    username: Yup.string().min(3).max(15).required(),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <h1>create post</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <legend>Title:</legend>
          <ErrorMessage name="title" component="span" />
          <Field id="inputCreatePost" name="title" placeholder="(Ex.Title)" />
          <legend>Post:</legend>
          <ErrorMessage name="postText" component="span" />
          <Field id="inputCreatePost" name="postText" placeholder="(Ex.Post)" />
          <legend>Username:</legend>
          <ErrorMessage name="username" component="span" />
          <Field id="inputCreatePost" name="username" placeholder="(Ex.john)" />
          <button type="submit"> Create Post </button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreatePost;
