const initialStateAccount = { balance: 0, loan: 0, loanPurpose: "" };

export default function accountReducer(state = initialStateAccount, action) {
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
export function deposit(amount) {
  return { type: "account/deposit", payload: Number(amount) };
}

export function withdraw(amount) {
  return { type: "account/withdraw", payload: Number(amount) };
}

export function loanRequest(amount, purpose) {
  return {
    type: "account/loanRequest",
    payload: { amount: +amount, purpose },
  };
}

export function payLoan() {
  return { type: "account/payLoan" };
}
