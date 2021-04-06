import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { editUser, fetchUsers } from "../../actions";
const EditUserModal = ({ setEditToggle, toEditUserID }) => {
  const userList = useSelector((state) => state.userReducer.users);
  const userToEdit = userList.find((e) => e._id === toEditUserID);

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const [newFirstName, setNewFirstName] = useState(userToEdit.firstName);
  const [newLastName, setNewLastName] = useState(userToEdit.lastName);
  const [newEmail, setNewEmail] = useState(userToEdit.email);
  const [newPhone, setNewPhone] = useState(userToEdit.phone);

  const errors = useSelector((state) => state.userReducer.errors);

  const AddUserSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is Required"),
    email: Yup.string().email("Invalid Email").required("Email is required"),
    phone: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone is required"),
  });
  const dispatch = useDispatch();

  const handleEdit = async (toEditUserID, editedUser) => {
    await dispatch(editUser(toEditUserID, editedUser));
    setEditToggle(false);
    await dispatch(fetchUsers());
  };
  return (
    <div
      className="modal is-active"
      onClick={() => {
        setEditToggle(false);
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
              setEditToggle(false);
            }}
          ></button>
        </header>
        <section className="modal-card-body">
          <Formik
            initialValues={{
              firstName: userToEdit.firstName,
              lastName: userToEdit.lastName,
              email: userToEdit.email,
              phone: userToEdit.phone,
            }}
            validationSchema={AddUserSchema}
          >
            {({ errors, touched, values, handleChange }) => (
              <Form>
                <div className="field">
                  <p className="control  has-icons-right">
                    <Field
                      className={`input ${
                        errors.firstName ? "is-danger" : null
                      } ${!errors.firstName ? "is-success" : null}`}
                      name="firstName"
                      placeholder="First Name "
                      onChange={(e) => {
                        handleChange(e);
                        setNewFirstName(e.target.value);
                      }}
                    />
                    {errors.firstName ? (
                      <p className="help is-danger">{errors.firstName}</p>
                    ) : null}

                    <span className="icon is-small is-right">
                      {errors.firstName ? (
                        <i class="fas fa-exclamation-triangle"></i>
                      ) : null}
                      {!errors.firstName ? (
                        <i className="fas fa-check"></i>
                      ) : null}
                    </span>
                  </p>
                </div>

                <div className="field">
                  <p className="control  has-icons-right">
                    <Field
                      className={`input ${
                        errors.lastName ? "is-danger" : null
                      } ${!errors.lastName ? "is-success" : null}`}
                      name="lastName"
                      placeholder="Last Name "
                      onChange={(e) => {
                        handleChange(e);
                        setNewLastName(e.target.value);
                      }}
                    />
                    {errors.lastName ? (
                      <p className="help is-danger">{errors.lastName}</p>
                    ) : null}

                    <span className="icon is-small is-right">
                      {errors.lastName ? (
                        <i class="fas fa-exclamation-triangle"></i>
                      ) : null}
                      {!errors.lastName ? (
                        <i className="fas fa-check"></i>
                      ) : null}
                    </span>
                  </p>
                </div>

                <div className="field">
                  <p className="control  has-icons-right">
                    <Field
                      className={`input ${errors.email ? "is-danger" : null} ${
                        !errors.email ? "is-success" : null
                      }`}
                      name="email"
                      type="email"
                      placeholder="Email"
                      onChange={(e) => {
                        handleChange(e);
                        setNewEmail(e.target.value);
                      }}
                    />
                    {errors.email ? (
                      <p className="help is-danger">{errors.email}</p>
                    ) : null}

                    <span className="icon is-small is-right">
                      {errors.email ? (
                        <i class="fas fa-exclamation-triangle"></i>
                      ) : null}
                      {!errors.email ? <i className="fas fa-check"></i> : null}
                    </span>
                  </p>
                </div>

                <div className="field">
                  <p className="control  has-icons-right">
                    <Field
                      className={`input ${errors.phone ? "is-danger" : null} ${
                        !errors.phone ? "is-success" : null
                      }`}
                      name="phone"
                      type="phone"
                      placeholder="Phone"
                      onChange={(e) => {
                        handleChange(e);
                        setNewPhone(e.target.value);
                      }}
                    />
                    {errors.phone ? (
                      <p className="help is-danger">{errors.phone}</p>
                    ) : null}

                    <span className="icon is-small is-right">
                      {errors.phone ? (
                        <i class="fas fa-exclamation-triangle"></i>
                      ) : null}
                      {!errors.phone ? <i className="fas fa-check"></i> : null}
                    </span>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </section>
        <footer className="modal-card-foot">
          <button
            className="button is-success"
            onClick={() =>
              handleEdit(toEditUserID, {
                firstName: newFirstName,
                lastName: newLastName,
                email: newEmail,
                phone: newPhone,
              })
            }
          >
            Save Changes
          </button>
          <button
            className="button"
            onClick={() => {
              setEditToggle(false);
            }}
          >
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default EditUserModal;
