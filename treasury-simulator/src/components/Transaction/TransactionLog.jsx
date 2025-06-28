import React, { useEffect, useState } from "react";
import "./TransactionLog.css";

export default function TransactionLog() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((err) => console.error("Error fetching transactions:", err));
  }, []);

  return (
    <div className="transaction-log-container">
      <h2>Transaction Log</h2>
      <table className="transaction-table">
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>Date</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan="6" className="no-transactions">
                No transactions found.
              </td>
            </tr>
          ) : (
            transactions.map((tx) => (
              <tr key={tx.id}>
                <td>{tx.account_From}</td>
                <td>{tx.account_To}</td>
                <td>{tx.amount}</td>
                <td>{tx.currency}</td>
                <td>{tx.date}</td>
                <td>{tx.comment}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
