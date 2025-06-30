import React, { useEffect, useState } from "react";
import "./TransactionLog.css";

export default function TransactionLog() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch(
      "https://my-json-server.typicode.com/fidelis182/treasury-api-mockup/transactions"
    )
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((err) => console.error("Error fetching transactions:", err));
  }, []);
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/transactions/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        // Update the state after deletion
        setTransactions((prev) => prev.filter((item) => item.id !== id));
      })
      .catch((err) => console.error("Delete failed:", err));
  };

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
            <th>Actions</th>
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
                <td>{tx.convertedAmount}</td>
                <td>{tx.currency}</td>
                <td>{tx.date}</td>
                <td>{tx.comment}</td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(tx.id)}
                >
                  Delete
                </button>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
