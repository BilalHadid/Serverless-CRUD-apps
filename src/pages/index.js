import React, { useState, useEffect } from "react";

import { Formik } from "formik";
import Layout from "../component/Layout";

export default function Home() {
  const [mydata, setData] = useState("Default Hello ");
  const [taskAll, setTaskall] = useState("NoTask");

  useEffect(() => {
    fetch(`/.netlify/functions/taskall`)
      .then((response) => response.json())
      .then((data) => {
        setTaskall(data);
        console.log("Data: " + JSON.stringify(data));
        console.log(data);
      });
  }, []);
  console.log(mydata);
  return (
    <div>
      <Layout>
        <h1>Anywhere in your app!</h1>
        <Formik
          initialValues={{ title: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.title) {
              errors.title = "Required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            fetch(`/.netlify/functions/fauna`, {
              method: "post",
              body: JSON.stringify(values),
            })
              .then((response) => response.json())
              .then((data) => {
                setData(data);
                console.log("Data: " + JSON.stringify(data));
              });
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
              {errors.title && touched.title && errors.title}

              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          )}
        </Formik>
        <div>
          <h1>{taskAll.message}</h1>
        </div>
      </Layout>
    </div>
  );
}
