import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./UserRow.scss";
import { deleteUser, fetchUsers } from "../../actions";
const UserRow = ({ user, setEditToggle, getToEditUserID }) => {
  const [toggleActions, setToggleActions] = useState(false);
  document.addEventListener("click", () => {
    setToggleActions(false);
  });
  const dispatch = useDispatch();

  const handleEdit = () => {
    setEditToggle(true);
    setToggleActions(false);
    getToEditUserID(user._id);
  };

  const handleDelete = () => {
    dispatch(deleteUser(user._id));
    dispatch(fetchUsers());
    setToggleActions(false);
  };

  return (
    <>
      <tr>
        <td>{user.firstName} </td>
        <td>{user.lastName}</td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
        <td>
          <div
            className={`dropdown is-right ${
              toggleActions ? "is-active" : null
            }`}
          >
            <div className="dropdown-trigger">
              <button
                className="button"
                aria-haspopup="true"
                aria-controls="dropdown-menu"
                onClick={(e) => {
                  e.stopPropagation();
                  setToggleActions(true);
                }}
              >
                <i className="fas fa-ellipsis-v"></i>
              </button>
            </div>
            <div
              className="dropdown-menu "
              id="dropdown-menu"
              role="menu"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="dropdown-content ">
                <div className="dropdown-item " onClick={() => handleEdit()}>
                  Edit
                </div>
                <hr className="dropdown-divider" />
                <div
                  className="dropdown-item has-text-danger"
                  onClick={() => handleDelete()}
                >
                  Delete
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default UserRow;
