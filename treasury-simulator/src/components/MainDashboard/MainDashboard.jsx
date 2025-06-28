import AccountList from "../AccountList/AccountList";
import TransactionLog from "../Transaction/TransactionLog";

export default function MainDashboard({ children }) {
  return (
    <div className="dashboard">
      <h1> Treasury Movement Simulator</h1>
      {children}
    </div>
  );
}
