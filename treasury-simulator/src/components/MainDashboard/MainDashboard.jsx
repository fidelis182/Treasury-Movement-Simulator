import AccountList from "../AccountList/AccountList";
import TransactionLog from "../Transaction/TransactionLog";

export default function MainDashboard() {
  return (
    <div className="dashboard">
      <div className="top-section">
        <div className="left-panel">
          <AccountList />
        </div>
        {/* <div className="right-panel">
      <TransferForm />
    </div> */}
      </div>
      <div className="bottom-section">
        <TransactionLog />
      </div>
    </div>
  );
}
