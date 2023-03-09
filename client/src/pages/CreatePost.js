import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const CreatePost = () => {
  // const [imageData, setImageData] = useState();

  let { imageId } = useParams();

  //Navigate to home page after onSubmit
  let navigate = useNavigate();
  const initialValues = {
    title: "",
    postText: "",
    PictureId: imageId,
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    postText: Yup.string().required(),
  });

  const onSubmit = async (data) => {
    await axios
      .post(`http://localhost:3001/posts`, data, {
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
    <div className="flex flex-wrap justify-center gap-4 p-32">
      <div className="flex items-center justify-center h-full ">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <ErrorMessage name="title" component="span" />
            <Field
              className="input input-bordered input-ghost w-full max-w mb-4"
              id="inputCreatePost"
              name="title"
              placeholder="Title"
            />

            <ErrorMessage name="postText" component="span" />
            <Field
              className="input input-bordered input-ghost w-full max-w mb-4"
              id="inputCreatePost"
              name="postText"
              placeholder="(Ex.Post)"
            />

            <button className="btn btn-block btn-outline" type="submit">
              Create Post
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default CreatePost;
