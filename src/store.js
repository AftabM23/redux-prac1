import { combineReducers, createStore } from "redux";
import customerReducer from "./features/customers/CustomerSlice";
import accountReducer from "./features/accounts/AccountSlice";
const rootReducer = combineReducers({
  customer: customerReducer,
  account: accountReducer,
});
const store = createStore(rootReducer);
export default store;
