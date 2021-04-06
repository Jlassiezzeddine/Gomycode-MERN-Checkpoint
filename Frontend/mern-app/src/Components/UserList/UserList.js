import React, { useEffect, useState } from "react";
import UserRow from "../UserRow/UserRow";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../actions/index";
import EditUserModal from "../EditUserModal/EditUserModal";
const UserList = () => {
  const [editToggle, setEditToggle] = useState(false);
  const [toEditUserID, setToEditUserID] = useState("");
  const userList = useSelector((state) => state.userReducer.users);
  const dispatch = useDispatch();

  const getToEditUserID = (id) => {
    setToEditUserID(id);
  };
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  return (
    <div className="container">
      <section className="section">
        <div className="block">
          <table className="table is-fullwidth is-hoverable ">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user, i) => (
                <UserRow
                  key={user._id}
                  user={user}
                  setEditToggle={setEditToggle}
                  getToEditUserID={getToEditUserID}
                />
              ))}
            </tbody>
          </table>
        </div>
      </section>
      {editToggle && (
        <EditUserModal
          setEditToggle={setEditToggle}
          toEditUserID={toEditUserID}
        />
      )}
    </div>
  );
};

export default UserList;
