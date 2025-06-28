import { useEffect, useState } from "react";

export default function TransactionLog() {
  const [accounts, setAccount] = useState("");
  useEffect(() => {
    // to get data from the API
    fetch("http://localhost:5000/accounts")
      // promise
      .then((res) => res.json())
      // to update data
      .then((data) => setAccount(data))
      .catch((err) => console.log(err.message));
  }, []);
  return (
    <div className="container ">
      <div className="table-container full-width">
        <h2>TransactionLog Table</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Account_name</th>
              <th>Currency</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {accounts &&
              accounts.map((item) => (
                <tr key={item.id}>
                  {" "}
                  {/* ✅ Add key here */}
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.currency}</td>
                  <td>{item.balance}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
