import { useState, useEffect } from "react";
import "./transfer.css";
import { useNavigate } from "react-router-dom";
const exchangeRates = {
  KES: { USD: 0.0067, NGN: 5.4 },
  USD: { KES: 150.0, NGN: 810.0 },
  NGN: { KES: 27.5, USD: 0.0012 },
};

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
    if (!from) {
      alert("Invalid source account.");
      return;
    }

    const fromCurrency = from.currency.toUpperCase();
    const inputCurrency = currency.toUpperCase();
    let convertedAmount = amountNum;

    // Convert if currencies differ
    if (inputCurrency !== fromCurrency) {
      const rate = exchangeRates[inputCurrency]?.[fromCurrency];
      if (!rate) {
        alert(`No exchange rate from ${inputCurrency} to ${fromCurrency}`);
        return;
      }
      convertedAmount = amountNum * rate;
    }

    if (convertedAmount > from.balance) {
      alert("Insufficient balance after conversion.");
      return;
    }

    const AccountData = {
      account_From,
      account_To,
      originalAmount: amountNum,
      convertedAmount: convertedAmount.toFixed(2),
      currency: inputCurrency,
      convertedCurrency: fromCurrency,
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

        <label htmlFor="currency">Currency (of amount above):</label>
        <input
          type="text"
          id="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          placeholder="e.g. KES, USD, NGN"
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
