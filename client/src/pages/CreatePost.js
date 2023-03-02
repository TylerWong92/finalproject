import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  //Navigate to home page after onSubmit
  let navigate = useNavigate();
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
    axios
      .post("http://localhost:3001/posts", data, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          alert("User Not Login");
        } else {
          navigate("/");
        }
      });
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
