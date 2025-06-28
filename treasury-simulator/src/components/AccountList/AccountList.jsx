import { useEffect, useState } from "react";
import "./account.css";
import TransferForm from "../Form/TransferForm";
import React from "react";

export default function AccountList() {
  const [accounts, setAccount] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [view, setView] = useState("accounts"); // "accounts" or "transactions"
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // to get data from the API
    fetch("http://localhost:5000/accounts")
      // promise
      .then((res) => res.json())
      // to update data
      .then((data) => setAccount(data))
      .catch((err) => console.log(err.message));
  }, []);
  const toggleForm = (accounts) => {
    setSelectedAccount((prev) =>
      prev && prev.id === accounts.id ? null : accounts
    );
  };
  return (
    <div className="container width-60">
      <div className="table-container relative">
        <h2>Account List </h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Account_name</th>
              <th>Currency</th>
              <th>Balance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {accounts &&
              accounts.map((item) => (
                <React.Fragment key={item.id}>
                  <tr>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.currency}</td>
                    <td>{item.balance}</td>
                    <td>
                      <button
                        onClick={() => toggleForm(item)}
                        className="btn-primary"
                      >
                        Transfer
                      </button>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
          </tbody>
        </table>
      </div>
      {selectedAccount && (
        <div className="absolute top-0 left-0 w-full h-full z-50 bg-white bg-opacity-95 p-6 shadow-xl">
          <TransferForm
            fromAccount={selectedAccount.name}
            accounts={accounts}
          />
          <button
            onClick={() => setSelectedAccount(null)}
            className="mt-4 btn btn-secondary"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
