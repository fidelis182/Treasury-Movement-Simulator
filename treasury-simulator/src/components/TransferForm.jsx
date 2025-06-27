import { useState } from "react";

export default function TransferForm() {
  const [account_From, setAccount_From] = useState("");
  const [account_To, setAccount_To] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");
  const [validation, setValidation] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const AccountData = {
      account_From,
      account_To,
      amount,
      currency,
      date,
      comment,
    };
    console.log(AccountData);
    fetch("http://localhost:5000/acounts", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(AccountData),
    })
      .then((res) => {
        alert("account data saved successfully");
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <div className="Container width-60">
      <h2>Transfer Form</h2>
      <form onSubmt={handleSubmit}>
        <label htmlFor="account_from">Account_From:</label>
        <input
          type="text"
          id="account_from"
          name="account_from"
          required
          value={account_From}
          onChange={(e) => setAccount_From(e.target.value)}
          onMouseDown={() => setValidation(true)}
        />
        {account_From.length === 0 && validation && (
          <span className="errorMsg">Please enter the account from</span>
        )}
        <label htmlFor="account_To">Account_To:</label>
        <input
          type="text"
          id="account_To"
          name="account_To"
          required
          value={account_To}
          onChange={(e) => setAccount_To(e.target.value)}
          onMouseDown={() => setValidation(true)}
        />
        {account_To.length === 0 && validation && (
          <span className="errorMsg">Please enter the destinationaccount</span>
        )}
        <label htmlFor="amount">Amount:</label>
        <input
          type="text"
          id="amount"
          name="amount"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          onMouseDown={() => setValidation(true)}
        />
        {amount.length === 0 && validation && (
          <span className="errorMsg">Please enter the amount </span>
        )}
        <label htmlFor="currency">Currency:</label>
        <input
          type="text"
          id="currency"
          name="currency"
          required
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          onMouseDown={() => setValidation(true)}
        />
        {currency.length === 0 && validation && (
          <span className="errorMsg">Please enter your currency</span>
        )}

        <label htmlFor="date">Date:</label>
        <input
          type="text"
          id="date"
          name="date"
          value={date}
          required
          onChange={(e) => setDate(e.target.value)}
          onMouseDown={() => setValidation(true)}
        />
        {date.length === 0 && validation && (
          <span className="errorMsg">Please enter transaction date</span>
        )}
        <label htmlFor="comment">Comment:</label>
        <input
          type="text"
          id="comment"
          name="comment"
          required
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onMouseDown={() => setValidation(true)}
        />
        {comment.length === 0 && validation && (
          <span className="errorMsg">Please enter your comment</span>
        )}
        <button className="btn btn-transfer">Transfer</button>
      </form>
    </div>
  );
}
