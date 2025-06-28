import { useState, useEffect } from "react";
import "./transfer.css";
import { useNavigate } from "react-router-dom";

export default function TransferForm({
  fromAccount,
  accounts = [],
  onTransfer,
}) {
  const [account_From, setAccount_From] = useState("");
  const [account_To, setAccount_To] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (fromAccount) {
      setAccount_From(fromAccount);
    }
  }, [fromAccount]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const amountNum = parseFloat(amount);

    if (isNaN(amountNum)) {
      alert("Amount must be a valid number.");
      return;
    }

    const from = accounts.find((acc) => acc.name === account_From);
    if (from && amountNum > from.balance) {
      alert("Insufficient balance.");
      return;
    }

    const AccountData = {
      account_From,
      account_To,
      amount: amountNum,
      currency,
      date,
      comment,
    };

    fetch("http://localhost:5000/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(AccountData),
    })
      .then(() => {
        alert("Transfer successful");
        onTransfer && onTransfer(AccountData);
        navigate("/transactions");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="Container width-60">
      <h2>Transfer Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="account_from">Account From:</label>
        <input type="text" id="account_from" value={account_From} readOnly />

        <label htmlFor="account_To">Account To:</label>
        <select
          id="account_To"
          value={account_To}
          onChange={(e) => setAccount_To(e.target.value)}
          required
        >
          <option value="">--Select Account--</option>
          {accounts
            .filter((acc) => acc.name !== account_From)
            .map((acc) => (
              <option key={acc.id} value={acc.name}>
                {acc.name}
              </option>
            ))}
        </select>

        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <label htmlFor="currency">Currency:</label>
        <input
          type="text"
          id="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          required
        />

        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <label htmlFor="comment">Comment:</label>
        <input
          type="text"
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button type="submit" className="btn btn-transfer">
          Transfer
        </button>
      </form>
    </div>
  );
}
