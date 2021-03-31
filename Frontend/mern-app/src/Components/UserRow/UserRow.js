import React, { useState } from "react";
import "./UserRow.scss";
const UserRow = ({ user }) => {
  const [toggleActions, setToggleActions] = useState(false);
  document.addEventListener("click", () => {
    setToggleActions(false);
  });
  return (
    <tr>
      <td>{user.firstName} </td>
      <td>{user.lastName}</td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
      <td>
        <div
          className={`dropdown is-right ${toggleActions ? "is-active" : null}`}
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
              <div class="dropdown-item ">Edit</div>
              <hr className="dropdown-divider" />
              <div class="dropdown-item has-text-danger">Delete</div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default UserRow;
