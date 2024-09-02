const initialStateCustomer = { fullName: "", nationalID: "", createdDate: "" };

export default function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createdAccount":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdDate: action.payload.createdDate,
      };
    case "customer/updateCustomer":
      return { ...state, fullName: action.payload };
    default:
      return state;
  }
}

export function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createdAccount",
    payload: { fullName, nationalID, createdDate: new Date().toISOString() },
  };
}

export function updateCustomer(fullname) {
  return { type: "customer/updateCustomer", payload: fullname };
}
