// import { applyMiddleware, combineReducers, createStore } from "redux";
// import { thunk } from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
import customerReducer from "./features/customers/CustomerSlice";
import accountSlice from "./features/accounts/AccountSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: { account: accountSlice, customer: customerReducer },
});
export default store;
// const rootReducer = combineReducers({
//   customer: customerReducer,
//   account: accountReducer,
// });
// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk))
// );
