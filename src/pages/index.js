import React, { useState, useEffect } from "react";
import { Formik } from "formik";

const Home = () => {
  const [mydata, setData] = useState("");

  useEffect(() => {
    console.log("useEffect Called");
    fetch(`/.netlify/Function/hello`)
      .then((response) => response.json())
      .then((data) => {
        // setData(data);
        console.log("Data: " + JSON.stringify(data));
      });
  }, []);
  console.log(mydata);

  return (
    <div>
      <div>
        <h1>Anywhere in your app!</h1>
        <Formik
          initialValues={{ title: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.title) {
              errors.title = "Required";
            }
            // {
            //   errors.title = "Invalid email address";
            // }
            return errors;
          }}
          onSubmit={(values) => {
            console.log(values);
            fetch(`/.netlify/Function/hello`, {
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
              <label>Title</label>
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
      </div>
    </div>
  );
};
export default Home;
