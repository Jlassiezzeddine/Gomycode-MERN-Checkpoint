import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addUser, fetchUsers } from "../../actions/index";

const AddUserModal = ({ setAddUserToggle }) => {
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const AddUserSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is Required"),
    email: Yup.string().email("Invalid Email").required("Email is required"),
    phone: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone is required"),
  });
  const dispatch = useDispatch();

  const submitHandler = async () => {
    await dispatch(
      addUser({
        firstName: newFirstName,
        lastName: newLastName,
        email: newEmail,
        phone: newPhone,
      })
    );
    setAddUserToggle(false);
    await dispatch(fetchUsers());
    //reset
    setNewFirstName("");
    setNewLastName("");
    setNewEmail("");
    setNewPhone("");
  };
  return (
    <div
      className="modal is-active"
      onClick={() => {
        setAddUserToggle(false);
      }}
    >
      <div className="modal-background"></div>
      <div
        className="modal-card"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <header className="modal-card-head">
          <p className="modal-card-title">Add New User</p>
          <button
            className="delete"
            aria-label="close"
            onClick={() => {
              setAddUserToggle(false);
            }}
          ></button>
        </header>
        <section className="modal-card-body">
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
            }}
            validationSchema={AddUserSchema}
          >
            {({ errors, touched, values, handleChange }) => (
              <Form>
                <div className="field">
                  <p className="control  has-icons-right">
                    <Field
                      className={`input ${
                        errors.firstName && touched.firstName
                          ? "is-danger"
                          : null
                      } ${
                        !errors.firstName && touched.firstName
                          ? "is-success"
                          : null
                      }`}
                      name="firstName"
                      placeholder="First Name "
                      onChange={(e) => {
                        handleChange(e);
                        setNewFirstName(e.target.value);
                      }}
                    />
                    {errors.firstName && touched.firstName ? (
                      <p className="help is-danger">{errors.firstName}</p>
                    ) : null}

                    <span className="icon is-small is-right">
                      {errors.firstName && touched.firstName ? (
                        <i class="fas fa-exclamation-triangle"></i>
                      ) : null}
                      {!errors.firstName && touched.firstName ? (
                        <i className="fas fa-check"></i>
                      ) : null}
                    </span>
                  </p>
                </div>

                <div className="field">
                  <p className="control  has-icons-right">
                    <Field
                      className={`input ${
                        errors.lastName && touched.lastName ? "is-danger" : null
                      } ${
                        !errors.lastName && touched.lastName
                          ? "is-success"
                          : null
                      }`}
                      name="lastName"
                      placeholder="Last Name "
                      onChange={(e) => {
                        handleChange(e);
                        setNewLastName(e.target.value);
                      }}
                    />
                    {errors.lastName && touched.lastName ? (
                      <p className="help is-danger">{errors.lastName}</p>
                    ) : null}

                    <span className="icon is-small is-right">
                      {errors.lastName && touched.lastName ? (
                        <i class="fas fa-exclamation-triangle"></i>
                      ) : null}
                      {!errors.lastName && touched.lastName ? (
                        <i className="fas fa-check"></i>
                      ) : null}
                    </span>
                  </p>
                </div>

                <div className="field">
                  <p className="control  has-icons-right">
                    <Field
                      className={`input ${
                        errors.email && touched.email ? "is-danger" : null
                      } ${
                        !errors.email && touched.email ? "is-success" : null
                      }`}
                      name="email"
                      type="email"
                      placeholder="Email"
                      onChange={(e) => {
                        handleChange(e);
                        setNewEmail(e.target.value);
                      }}
                    />
                    {errors.email && touched.email ? (
                      <p className="help is-danger">{errors.email}</p>
                    ) : null}

                    <span className="icon is-small is-right">
                      {errors.email && touched.email ? (
                        <i class="fas fa-exclamation-triangle"></i>
                      ) : null}
                      {!errors.email && touched.email ? (
                        <i className="fas fa-check"></i>
                      ) : null}
                    </span>
                  </p>
                </div>

                <div className="field">
                  <p className="control  has-icons-right">
                    <Field
                      className={`input ${
                        errors.phone && touched.phone ? "is-danger" : null
                      } ${
                        !errors.phone && touched.phone ? "is-success" : null
                      }`}
                      name="phone"
                      type="phone"
                      placeholder="Phone"
                      onChange={(e) => {
                        handleChange(e);
                        setNewPhone(e.target.value);
                      }}
                    />
                    {errors.phone && touched.phone ? (
                      <p className="help is-danger">{errors.phone}</p>
                    ) : null}

                    <span className="icon is-small is-right">
                      {errors.phone && touched.phone ? (
                        <i class="fas fa-exclamation-triangle"></i>
                      ) : null}
                      {!errors.phone && touched.phone ? (
                        <i className="fas fa-check"></i>
                      ) : null}
                    </span>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success" onClick={submitHandler}>
            Add
          </button>
          <button className="button">Cancel</button>
        </footer>
      </div>
    </div>
  );
};

export default AddUserModal;
