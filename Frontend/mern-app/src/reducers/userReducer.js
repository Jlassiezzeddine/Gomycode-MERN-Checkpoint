const initialState = {
  users: [],
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    //FETCHING USERS
    case "FETCH_USERS_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_USERS_SUCCESS":
      return { ...state, users: action.payload, loading: false };
    case "FETCH_USERS_FAILURE":
      return { ...state, loading: false, error: action.error };
    //ADDING A USER
    case "ADD_USER_REQUEST":
      return { ...state, loading: true, error: null };
    case "ADD_USER_SUCCESS":
      return {
        ...state,
        users: [...state.users],
        loading: false,
      };
    case "ADD_USER_FAILURE":
      return { ...state, loading: false, error: action.error };
    //EDITING A USER
    case "EDIT_USER_REQUEST":
      return { ...state, loading: true, error: null };
    case "EDIT_USER_SUCCESS":
      return {
        ...state,
        users: [...state.users],
        loading: false,
      };
    case "EDIT_USER_FAILURE":
      return { ...state, loading: false, error: action.error };
    //DELETE A USER
    case "DELETE_USER_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "DELETE_USER_SUCCESS":
      return {
        //LOGIC TO RERENDER MISSING
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
        loading: false,
      };
    case "DELETE_USER_FAILURE":
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
};

export default userReducer;
