import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

const Registration = () => {
  let navigate = useNavigate();

  // Form store data using formik
  const initialValues = {
    username: "",
    password: "",
  };
  // Error handle using yup
  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then((response) => {
      console.log(response.data);
    });
    navigate("/login");
    alert("Successful Registration");
  };

  return (
    <div className=" flex justify-center items-center h-screen ">
      <div>
        <fieldset>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            <Form>
              <React.Fragment>
                <label className="label">
                  <span className="label-text">Register</span>
                  <span className="label-text-alt">Login as a member!</span>
                </label>

                <ErrorMessage name="username" component="span" />

                <Field
                  className="input input-bordered input-ghost w-full max-w mb-4"
                  name="username"
                  placeholder="Username(Ex.john)"
                />
              </React.Fragment>

              <ErrorMessage name="password" component="span" />
              <Field
                className="input input-bordered input-ghost w-full max-w mb-4"
                type="password"
                name="password"
                placeholder="Password (More than 4 letter)"
              />
              <button className="btn btn-block btn-outline" type="submit">
                Register Now!
              </button>
            </Form>
          </Formik>
        </fieldset>
      </div>
    </div>
  );
};

export default Registration;
