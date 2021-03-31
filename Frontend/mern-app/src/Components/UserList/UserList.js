import React, { useState, useEffect } from "react";
import axios from "axios";
import UserRow from "../UserRow/UserRow";

const UserList = () => {
  const [listOfUSer, setListOfUser] = useState([]);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:7200/user")
      .then((response) => setListOfUser(response.data))
      .catch((err) => setErrors(err));
  }, []);
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
              {listOfUSer.map((user, i) => (
                <UserRow key={user.id} user={user} />
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default UserList;
