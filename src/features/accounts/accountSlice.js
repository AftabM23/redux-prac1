import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    loanRequest: {
      prepare(amount, purpose) {
        return { payload: { amount, purpose } };
      },

      reducer(state, action) {
        if (state.loan > 0) return;
        state.balance += Number(action.payload.amount);
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
      },
    },
    payLoan(state, action) {
      state.balance -= Number(state.loan);
      state.loan = 0;
      state.loanPurpose = "";
    },
    isLoading(state, action) {
      state.isLoading = true;
    },
  },
});
console.log(accountSlice);

export const { withdraw, loanRequest, payLoan, isLoading } =
  accountSlice.actions;
export function deposit(amount, currency) {
  if (currency === "USD")
    return { type: "account/deposit", payload: Number(amount) };
  return async function (dispatch) {
    dispatch({ type: "account/isLoading" });
    console.log(amount);
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const convertedAmount = data.rates.USD;
    dispatch({ type: "account/deposit", payload: convertedAmount });
  };
}

export default accountSlice.reducer;

// export default function accountReducer(state = initialState, action) {
//   switch (action.type) {
//     case "account/deposit":
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };
//     case "account/withdraw":
//       return { ...state, balance: state.balance - action.payload };
//     case "account/loanRequest":
//       if (state.loan > 0) return;
//       return {
//         ...state,
//         loan: action.payload.amount,
//         balance: state.balance + action.payload.amount,
//         loanPurpose: action.payload.purpose,
//       };
//     case "account/payLoan":
//       return {
//         ...state,
//         loan: 0,
//         loanPurpose: "",
//         balance: state.balance - state.loan,
//       };
//     case "account/isLoading":
//       return { ...state, isLoading: true };
//     default:
//       return state;
//   }
// }
// export function deposit(amount, currency) {
//   if (currency === "USD")
//     return { type: "account/deposit", payload: Number(amount) };
//   return async function (dispatch) {
//     dispatch({ type: "account/isLoading" });
//     console.log(amount);
//     const res = await fetch(
//       `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
//     );
//     const data = await res.json();
//     const convertedAmount = data.rates.USD;
//     dispatch({ type: "account/deposit", payload: convertedAmount });
//   };
// }

// export function withdraw(amount) {
//   return { type: "account/withdraw", payload: Number(amount) };
// }

// export function loanRequest(amount, purpose) {
//   return {
//     type: "account/loanRequest",
//     payload: { amount: +amount, purpose },
//   };
// }

// export function payLoan() {
//   return { type: "account/payLoan" };
// }
