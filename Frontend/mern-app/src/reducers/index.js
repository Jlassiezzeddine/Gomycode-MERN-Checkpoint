import userReducer from "./userReducer";
const { combineReducers } = require("redux");

const rootReducer = combineReducers({ userReducer });

export default rootReducer;
