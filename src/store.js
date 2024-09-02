import { createStore } from "redux";

const initialState = { balance: 0, loan: 0, loanPurpose: "" };

function reducer(state = initialState, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/loanRequest":
      if (state.loan > 0) return;
      return {
        ...state,
        loan: action.payload.amount,
        balance: state.balance + action.payload.amount,
        loanPurpose: action.payload.purpose,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

// store.dispatch({ type: "account/deposit", payload: 5000 });
// console.log(store.getState());
// store.dispatch({ type: "account/withdraw", payload: 300 });
// console.log(store.getState());
// store.dispatch({
//   type: "account/loanRequest",
//   payload: { amount: 5000, purpose: "Buy laptop" },
// });
// console.log(store.getState());
// store.dispatch({ type: "account/payLoan" });
// console.log(store.getState());

function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}
store.dispatch(deposit(399 + 55));
console.log(store.getState());

function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
store.dispatch(withdraw(399 + 55));
console.log(store.getState());
function loanRequest(amount, purpose) {
  return {
    type: "account/loanRequest",
    payload: { amount, purpose },
  };
}

store.dispatch(loanRequest(900, "buy perfume"));
console.log(store.getState());
function payLoan() {
  return { type: "account/payLoan" };
}

store.dispatch(payLoan());
console.log(store.getState());
