import axios from "axios";

export const fetchUsers = () => async (dispatch) => {
  dispatch({ type: "FETCH_USERS_REQUEST" });
  try {
    const response = await axios.get("http://localhost:7200/user");
    dispatch({ type: "FETCH_USERS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "FETCH_USERS_FAILURE", error });
  }
};

export const addUser = (newUser) => async (dispatch) => {
  dispatch({ type: "ADD_USER_REQUEST" });
  try {
    await axios.post("http://localhost:7200/user/addNew", newUser);
    dispatch({ type: "ADD_USER_SUCCESS", payload: newUser });
  } catch (error) {
    dispatch({ type: "ADD_USER_FAILURE", error });
  }
};

export const editUser = (userToEdit, editedUser) => async (dispatch) => {
  dispatch({ type: "EDIT_USER_REQUEST" });
  try {
    await axios.put(
      `http://localhost:7200/user/edit/${userToEdit}`,
      editedUser
    );
    dispatch({ type: "EDIT_USER_SUCCESS", payload: userToEdit });
  } catch (error) {
    dispatch({ type: "EDIT_USER_FAILURE", error });
  }
};
export const deleteUser = (userToDelete) => async (dispatch) => {
  dispatch({ type: "DELETE_USER_REQUEST" });
  try {
    await axios.delete(`http://localhost:7200/user/delete/${userToDelete}`);
    dispatch({ type: "DELETE_USER_SUCCESS", payload: userToDelete });
  } catch (error) {
    dispatch({ type: "DELETE_USER_FAILURE", error });
  }
};
