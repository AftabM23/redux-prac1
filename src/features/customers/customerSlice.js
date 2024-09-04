import { createSlice } from "@reduxjs/toolkit";

const initialState = { fullName: "", nationalID: "", createdDate: "" };

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createCustomer: {
      prepare(fullName, nationalID) {
        return { payload: { fullName, nationalID } };
      },
      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationalID = action.payload.nationalID;
        state.createdDate = new Date().toISOString();
      },
    },
    updateCustomer(state, action) {
      state.fullName = action.payload;
    },
  },
});

export const { createCustomer, updateCustomer } = customerSlice.actions;
export default customerSlice.reducer;

// export default function customerReducer(state = initialStateCustomer, action) {
//   switch (action.type) {
//     case "customer/createdAccount":
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//         nationalID: action.payload.nationalID,
//         createdDate: action.payload.createdDate,
//       };
//     case "customer/updateCustomer":
//       return { ...state, fullName: action.payload };
//     default:
//       return state;
//   }
// }

// export function createCustomer(fullName, nationalID) {
//   return {
//     type: "customer/createdAccount",
//     payload: { fullName, nationalID, createdDate: new Date().toISOString() },
//   };
// }

// export function updateCustomer(fullname) {
//   return { type: "customer/updateCustomer", payload: fullname };
// }
