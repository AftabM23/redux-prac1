import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deposit, loanRequest, payLoan, withdraw } from "./AccountSlice";

function AccountOperations() {
  // const loanbalance = useSelector((store) => store.account.loan);
  // const loanReason = useSelector((store) => store.account.loanPurpose);
  const {
    isLoading,
    loan: loanbalance,
    loanPurpose: loanReason,
  } = useSelector((store) => store.account);

  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [currency, setCurrency] = useState("USD");
  const dispatch = useDispatch();
  function handleDeposit() {
    dispatch(deposit(depositAmount, currency));
    setDepositAmount("");
  }

  function handleWithdrawal() {
    dispatch(withdraw(withdrawalAmount));
    setWithdrawalAmount("");
  }

  function handleRequestLoan() {
    if (!loanAmount || !loanPurpose) return;
    dispatch(loanRequest(loanAmount, loanPurpose));
    setLoanAmount("");
    setLoanPurpose("");
  }

  function handlePayLoan() {
    dispatch(payLoan());
  }

  return (
    <div>
      <h2>Your account operations</h2>
      <div className="inputs">
        <div>
          <label>Deposit</label>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(+e.target.value)}
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
          </select>
          {isLoading ? (
            <button>converting</button>
          ) : (
            <button onClick={handleDeposit}>Deposit {depositAmount}</button>
          )}
          {/* <button onClick={handleDeposit}>Deposit {depositAmount}</button> */}
        </div>

        <div>
          <label>Withdraw</label>
          <input
            type="number"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(+e.target.value)}
          />
          <button onClick={handleWithdrawal}>
            Withdraw {withdrawalAmount}
          </button>
        </div>

        <div>
          <label>Request loan</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(+e.target.value)}
            placeholder="Loan amount"
          />
          <input
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            placeholder="Loan purpose"
          />
          <button onClick={handleRequestLoan}>Request loan</button>
        </div>

        {loanbalance ? (
          <div>
            <span>
              Pay back ${loanbalance} {loanReason}
            </span>
            <button onClick={handlePayLoan}>Pay loan</button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default AccountOperations;
